import { Dispatch } from 'react'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { createDidFormat } from '../../../formatters'
import { addContentToKey, DataVaultContent, receiveKeyData, removeContentfromKey, swapContentById, receiveStorageInformation, DataVaultStorageState, DataVaultKey } from '../reducers/datavault'
import { getDataVault } from '../../../config/getConfig'
import { CreateContentResponse } from '@rsksmart/ipfs-cpinner-client/lib/types'

/**
 * Create DataVault Clinet
 * @param provider web3 provider
 * @param address address of the user
 * @param chainId chainId of the network to create the DID
 */
export const createClient = (provider: any, address: string, chainId: number) => {
  const dataVaultConfig = <{serviceUrl: string, serviceDid: string} | null> getDataVault(chainId)

  return dataVaultConfig
    ? new DataVaultWebClient({
      serviceUrl: dataVaultConfig.serviceUrl,
      serviceDid: dataVaultConfig.serviceDid,
      did: createDidFormat(address, chainId),
      rpcPersonalSign: (data: string) => provider.request({ method: 'personal_sign', params: [address, data] })
    })
    : null
}

/**
 * Get all keys and data from the datavault
 * @param client DataVault client
 * @param did DID of the user, required for getting individual key content
 */
export const getDataVaultContent = (client: DataVaultWebClient, did: string) => (dispatch: Dispatch<any>) =>
  client.getKeys()
    .then((keys: string[]) =>
      keys.forEach((key: string) =>
        client.get({ did, key })
          .then((content: any) => content as DataVaultContent[])
          .then((content: DataVaultContent[]) => dispatch(receiveKeyData({ key, content })))
      )
    )

/**
 * Create Datavault content to an existing key or a new key
 * @param client DataVault client
 * @param key DV key
 * @param content content to be inserted
 */
export const createDataVaultContent = (client: DataVaultWebClient, key: string, content: string) => (dispatch: Dispatch<any>) =>
  client.create({ key, content })
    .then((result: CreateContentResponse) => result.id)
    .then((id: string) => dispatch(addContentToKey({ key, content: { id, content } })))

/**
 * Delete item from the datavault with its key and id
 * @param client DataVault client
 * @param key Key of the object
 * @param id ID of the content
 */
export const deleteDataVaultContent = (client: DataVaultWebClient, key: string, id: string) => (dispatch: Dispatch<any>) =>
  client.delete({ key, id })
    .then(() => dispatch(removeContentfromKey({ key, id })))

/**
 * Swap content in the datavault by key, and Id
 * @param client DataVault client
 * @param key Key of object
 * @param content New content
 * @param id id of the content
 */
export const swapDataVaultContent = (client: DataVaultWebClient, key: string, content: string, id: string) => (dispatch: Dispatch<any>) =>
  client.swap({ key, content, id })
    .then(() => dispatch(swapContentById({ key, id, content })))

/**
 * Returns storage information from DataVault
 * @param client DataVault client
 */
export const getStorageInformation = (client: DataVaultWebClient) => (dispatch: Dispatch<any>) =>
  client.getStorageInformation()
    .then((storage: DataVaultStorageState) => dispatch(receiveStorageInformation({ storage })))

/**
 * Helper function that loops through DataVault items and decides if key & value should be created, updated, or removed
 * @param client DataVault Client
 * @param item Key/Value DataVault pair where KEY is the DV KEY and VALUE is an array of DataVaultContent
 */
export const modifyMultipleItems = (client: DataVaultWebClient, values: DataVaultKey) => (dispatch: Dispatch<any>) => {
  // eslint-disable-next-line prefer-const
  let promiseArray: Promise<any>[] = []

  Object.keys(values).map((key: string) =>
    values[key].map((item: DataVaultContent) => {
      let action: any
      if (item.id === '' && item.content !== '') {
        action = () => dispatch(createDataVaultContent(client, key, item.content))
      } else if (item.id !== '' && item.content !== '') {
        action = () => dispatch(swapDataVaultContent(client, key, item.content, item.id))
      } else if (item.id !== '' && item.content === '') {
        action = () => dispatch(deleteDataVaultContent(client, key, item.id))
      }

      promiseArray.push(new Promise((resolve) => { resolve(action()) }))
    })
  )

  return Promise.all(promiseArray)
}
