import { Dispatch } from 'react'
import DataVaultWebClient, { AuthManager, EncryptionManager } from '@rsksmart/ipfs-cpinner-client'

import { createDidFormat } from '../../../formatters'
import { addContentToKey, DataVaultContent, receiveKeyData, removeContentfromKey, swapContentById, receiveStorageInformation, DataVaultStorageState, DataVaultKey } from '../reducers/datavault'
import { getDataVault } from '../../../config/getConfig'
import { Backup, CreateContentResponse } from '@rsksmart/ipfs-cpinner-client/lib/types'

/**
 * Create DataVault Clinet
 * @param provider web3 provider
 * @param address address of the user
 * @param chainId chainId of the network to create the DID
 */
export const createClient = (provider: any, address: string, chainId: number) => {
  const serviceUrl = getDataVault()
  const did = createDidFormat(address, chainId)

  const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [address, data] })
  const decrypt = (hexCypher: string) => provider.request({ method: 'eth_decrypt', params: [hexCypher, address] })
  const getEncryptionPublicKey = () => provider.request({ method: 'eth_getEncryptionPublicKey', params: [address] })

  return new DataVaultWebClient({
    serviceUrl,
    authManager: new AuthManager({ did, serviceUrl, personalSign }),
    encryptionManager: new EncryptionManager({ getEncryptionPublicKey, decrypt })
  })
}

/**
 * Get all keys and data from the datavault
 * @param client DataVault client
 * @param did DID of the user, required for getting individual key content
 */
export const getDataVaultContent = (client: DataVaultWebClient) => (dispatch: Dispatch<any>) =>
  client.getKeys()
    .then((keys: string[]) =>
      keys.forEach((key: string) =>
        client.get({ key })
          .then((content: any) => content as DataVaultContent[])
          .then((content: DataVaultContent[]) => dispatch(receiveKeyData({ key, content }))))
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

/**
 * Start the Data Vault Client
 * Request StorageInformation first, which will save the access token with the DataVault Service
 * in localStorage. Then request the content from the data vault.
 * @param provider Web3 Provider
 * @param address User Address
 * @param chainId ChainId
 * @param callback Function
 */
export const dataVaultStart = (provider: any, address: string, chainId: number, callback?: any) => (dispatch: Dispatch<any>) => {
  const client = createClient(provider, address, chainId)

  client.getStorageInformation()
    .then((storage: DataVaultStorageState) => {
      dispatch(receiveStorageInformation({ storage }))
      dispatch(getDataVaultContent(client))
      callback(client)
    })
    .catch((err: any) => callback(null, err))
}

/**
 * Download backup text file from the DataVault
 * @param client DataVault Client
 */
export const downloadBackup = (client: DataVaultWebClient) =>
  client.getBackup()
    .then((value: Backup) => JSON.stringify(value))
    .then((value: string) => {
      const element = document.createElement('a')
      element.href = URL.createObjectURL(new Blob([value], { type: 'text/plain;charset=utf-8' }))
      element.download = 'dataVaultBackup.txt'
      document.body.appendChild(element)
      element.click()
      element.remove()
    })
