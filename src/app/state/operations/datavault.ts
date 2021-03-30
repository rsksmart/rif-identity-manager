import { Dispatch } from 'react'
import DataVaultWebClient, { AuthManager, AsymmetricEncryptionManager, SignerEncryptionManager } from '@rsksmart/ipfs-cpinner-client'

import { createDidFormat } from '../../../formatters'
import { addContentToKey, DataVaultContent, receiveKeyData, removeContentfromKey, swapContentById, receiveStorageInformation, DataVaultStorageState, DataVaultKey, receiveKeys } from '../reducers/datavault'
import { getDataVault } from '../../../config/getConfig'
import { Backup, CreateContentResponse } from '@rsksmart/ipfs-cpinner-client/lib/types'
import { getProviderName, PROVIDERS } from '../../../ethrpc'
import { IEncryptionManager } from '@rsksmart/ipfs-cpinner-client/lib/encryption-manager/types'

/**
 * Helper function that returns the correct encryption method
 * @param provider web3 provider
 */
const getEncryptionManager = async (provider: any) =>
  getProviderName(provider) === PROVIDERS.METAMASK
    ? await AsymmetricEncryptionManager.fromWeb3Provider(provider)
    : await SignerEncryptionManager.fromWeb3Provider(provider)

/**
 * Create DataVault Clinet
 * @param provider web3 provider
 * @param address address of the user
 * @param chainId chainId of the network to create the DID
 */
export const createClient = (provider: any, address: string, chainId: number) => {
  const serviceUrl = getDataVault()
  const did = createDidFormat(address, chainId).toLowerCase()
  const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })
  const authManager = new AuthManager({ did, serviceUrl, personalSign })

  return getEncryptionManager(provider)
    .then((encryptionManager: IEncryptionManager) =>
      new DataVaultWebClient({ serviceUrl, authManager, encryptionManager }))
}

/**
 * Get all keys and from the datavault
 * @param client DataVault client
 */
export const getDataVaultKeys = (client: DataVaultWebClient) => (dispatch: Dispatch<any>) =>
  client.getKeys()
    .then((keys: string[]) => dispatch(receiveKeys({ keys })))

/**
 * Get all content from a specific key from the datavault
 * @param client DataVault client
 * @param key string
 */
export const getDataVaultContent = (client: DataVaultWebClient, key: string) => (dispatch: Dispatch<any>) =>
  client.get({ key })
    .then((content: any) => content as DataVaultContent[])
    .then((content: DataVaultContent[]) => dispatch(receiveKeyData({ key, content })))

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
 * Decrypt multiple keys at one time
 * @param client Datavault clinet
 * @param keys string[] keys that you want to decrypt
 */
export const decryptMultipleKeys = (client: DataVaultWebClient, keys: string[]) => (dispatch: Dispatch<any>) =>
  keys.map(key => dispatch(getDataVaultContent(client, key)))

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

  client.then((client: DataVaultWebClient) => client.getStorageInformation()
    .then((storage: DataVaultStorageState) => {
      dispatch(receiveStorageInformation({ storage }))
      dispatch(getDataVaultKeys(client))
      callback(client)
    })
    .catch((err: any) => callback(null, err))
  )
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
