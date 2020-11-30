import { Dispatch } from 'react'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { createDidFormat } from '../../../formatters'
import { receiveKeyData } from '../reducers/datavault'
import { getDataVault } from '../../../config/getConfig'

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
      did: createDidFormat(address, chainId, true),
      rpcPersonalSign: (data: string) => provider.request({ method: 'personal_sign', params: [address, data] })
    })
    : null
}

/**
 * Get all keys and data from the datavault
 * @param client DataVault client
 * @param did DID of the user, required for now
 */
export const getDataVaultContent = (client: DataVaultWebClient, did: string) => (dispatch: Dispatch<any>) =>
  client.getKeys({ did })
    .then((keys: string[]) =>
      keys.forEach((key: string) =>
        client.get({ did, key })
          .then((content: string[]) =>
            dispatch(receiveKeyData({ key, content }))
          )
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
    .then(() => dispatch(receiveKeyData({ key, content: [content] })))
