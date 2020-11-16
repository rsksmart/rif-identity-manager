import { Dispatch } from 'react'
import EthrDID from '@rsksmart/ethr-did'
import { getAccountAndNetwork } from '../../../ethrpc'
import { changeOwner, resolveDid, addDelegate as addDelegateS } from '../reducers/ethrdid'
import { getResolver } from 'ethr-did-resolver'
import { DIDDocument, Resolver } from 'did-resolver'
import { getSetting, SETTINGS } from '../../../config/getConfig'
import { createDidFormat } from '../../../helpers'

const Secp256k1VerificationKey2018 = '0x73696741757468'

/**
 * Returns the owner of a DID from the Ethr DID Registry
 * @param provider web3 provider
 */
export const lookupOwner = (provider: any) => (dispatch: Dispatch<any>) =>
  getAccountAndNetwork(provider).then(([address, chainId]) => {
    new EthrDID({
      address: address,
      provider,
      registry: getSetting(parseInt(chainId), SETTINGS.ETHR_DID_CONTRACT)
    })
      .lookupOwner(address).then((owner: string) => dispatch(changeOwner({ owner })))
  })

/**
 * Set the owner in the DID Registry. Can only be set by the owner.
 * @param provider web3 provider
 * @param newOwner new owner of the DID
 */
export const setDidOwner = (provider: any, newOwner: string) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    getAccountAndNetwork(provider).then(([address, chainId]) =>
      new EthrDID({
        address: address,
        provider,
        registry: getSetting(parseInt(chainId), SETTINGS.ETHR_DID_CONTRACT)
      })
        .changeOwner(newOwner.toLowerCase())
        .then(() => resolve(dispatch(changeOwner({ owner: newOwner }))))
        .catch((err: Error) => reject(err))
    )
  })

/**
 * Reolve a DID
 * @param provider web3 provider
 */
export const resolve = (provider: any) => (dispatch: Dispatch<any>) => {
  getAccountAndNetwork(provider).then(([address, chainId]) => {
    const providerConfig = {
      networks: [
        { name: 'rsk', registry: getSetting(30, SETTINGS.ETHR_DID_CONTRACT), rpcUrl: getSetting(30, SETTINGS.RPC_URL) },
        { name: 'rsk:testnet', registry: getSetting(31, SETTINGS.ETHR_DID_CONTRACT), rpcUrl: getSetting(31, SETTINGS.RPC_URL) },
        { name: 'development', registry: getSetting(5777, SETTINGS.ETHR_DID_CONTRACT), rpcUrl: getSetting(5777, SETTINGS.RPC_URL) }
      ]
    }
    const didResolver = new Resolver(getResolver(providerConfig))

    const did = createDidFormat(address, chainId, true)
    didResolver.resolve(did).then((data: DIDDocument) => dispatch(resolveDid({ data })))
  })
}

export const addDelegate = (provider: any, delegate: string) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    getAccountAndNetwork(provider).then(([address, chainId]) =>
      new EthrDID({
        address: address,
        provider,
        registry: getSetting(parseInt(chainId), SETTINGS.ETHR_DID_CONTRACT)
      })
        .addDelegate(delegate, {
          delegateType: Secp256k1VerificationKey2018
        })
        .then((response: any) => {
          dispatch(addDelegateS({ delegate }))
          resolve(response)
        })
        .catch((err: Error) => reject(err))
    )
  })
