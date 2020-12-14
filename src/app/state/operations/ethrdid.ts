import { Dispatch } from 'react'
import EthrDID from '@rsksmart/ethr-did'
import { getAccountAndNetwork } from '../../../ethrpc'
import { resolveDid } from '../reducers/ethrdid'
import { getResolver } from 'ethr-did-resolver'
import { DIDDocument, Resolver } from 'did-resolver'
import { getDIDRegistryAddress } from '../../../config/getConfig'
import { createDidFormat } from '../../../formatters'
import { resolverProviderConfig } from '../../../features/resolverConfig'

const Secp256k1VerificationKey2018 = '0x73696741757468'

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
        registry: getDIDRegistryAddress(parseInt(chainId))
      })
        .changeOwner(newOwner.toLowerCase())
        .then(() => resolve(dispatch(resolveDidDocument(provider))))
        .catch((err: Error) => reject(err))
    )
  })

/**
 * Resolve an address. Returns a DIDDocument
 * @param provider web3 provider
 */
export const resolveDidDocument = (provider: any) => (dispatch: Dispatch<any>) =>
  new Promise((resolve) => {
    getAccountAndNetwork(provider).then(([address, chainId]) => {
      const didResolver = new Resolver(getResolver(resolverProviderConfig))

      const did = createDidFormat(address, chainId, true)
      didResolver.resolve(did).then((data: DIDDocument) => resolve(dispatch(resolveDid({ data }))))
    })
  })

export const addDelegate = (provider: any, delegate: string) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    getAccountAndNetwork(provider).then(([address, chainId]) =>
      new EthrDID({
        address: address,
        provider,
        registry: getDIDRegistryAddress(parseInt(chainId))
      })
        .addDelegate(delegate, {
          delegateType: Secp256k1VerificationKey2018
        })
        .then((response: any) => {
          dispatch(resolveDidDocument(provider))
          resolve(response)
        })
        .catch((err: Error) => reject(err))
    )
  })

export const addAttribute = (provider: any, type: string, value: string, validity?: number) => (dispatch: Dispatch<any>) => {
  console.log('adding', type, value, validity)
  return new Promise((resolve, reject) => {
    getAccountAndNetwork(provider).then(([address, chainId]) =>
      new EthrDID({
        address: address,
        provider,
        registry: getDIDRegistryAddress(parseInt(chainId))
      })
        .setAttribute(type, value, validity)
        .then((response: any) => {
          dispatch(resolveDidDocument(provider))
          resolve(response)
        })
        .catch((err: Error) => reject(err))
    )
  })
}
// .setAttribute('did/pub/Ed25519/veriKey/base64', 'mypublickey')
// .setAttribute('did/svc/HubService', 'https://jesse.photo')

/*
export const addServiceEndpoint = (provider: any, name: string, url: string, validity: number) => (dispatch: Dispatch<any>) =>
  dispatch(addAttribute(provider, `did/svc/${name}`, url, validity))
*/
