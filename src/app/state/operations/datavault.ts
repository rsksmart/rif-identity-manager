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
  const did = createDidFormat(address, chainId, true) // temp for now
  const client = new DataVaultWebClient({
    ...getDataVault(),
    did,
    rpcPersonalSign: (data: string) => provider.request({ method: 'personal_sign', params: [address, data] })
  })
  return client
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
