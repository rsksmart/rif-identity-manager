import { Dispatch } from 'react'
import EthrDID from '@rsksmart/ethr-did'
import { getAccountAndNetwork, transactionListener, transactionListenerI } from '../../../ethrpc'
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
    const callback = (response: transactionListenerI) =>
      response.error ? reject(response.error) : resolve(dispatch(resolveDidDocument(provider)))

    getAccountAndNetwork(provider).then(([address, chainId]) =>
      new EthrDID({
        address: address,
        provider,
        registry: getDIDRegistryAddress(parseInt(chainId))
      })
        .changeOwner(newOwner.toLowerCase())
        .then((tx: string) => transactionListener(provider, tx, callback))
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

      const did = createDidFormat(address, chainId)
      didResolver.resolve(did).then((data: DIDDocument) => resolve(dispatch(resolveDid({ data }))))
    })
  })

/**
 * Add Delegate to a persona
 * @param provider web3 provider
 * @param delegate address of the new delegate
 */
export const addDelegate = (provider: any, delegate: string) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    const callback = (response: transactionListenerI) =>
      response.error ? reject(response.error) : resolve(dispatch(resolveDidDocument(provider)))

    getAccountAndNetwork(provider).then(([address, chainId]) =>
      new EthrDID({
        address: address,
        provider,
        registry: getDIDRegistryAddress(parseInt(chainId))
      })
        .addDelegate(delegate, {
          delegateType: Secp256k1VerificationKey2018
        })
        .then((tx: string) => transactionListener(provider, tx, callback))
        .catch((err: Error) => reject(err))
    )
  })

/**
 * Add Attribute to DID Document
 * @param provider web3 provider
 * @param type attribute type
 * @param value value
 * @param validity time in seconds valid, optional, defaults to 86400 seconds, or 1 day
 */
export const addAttribute = (provider: any, type: string, value: string, validity?: number) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    const callback = (response: transactionListenerI) =>
      response.error ? reject(response.error) : resolve(dispatch(resolveDidDocument(provider)))

    getAccountAndNetwork(provider).then(([address, chainId]) =>
      new EthrDID({
        address: address,
        provider,
        registry: getDIDRegistryAddress(parseInt(chainId))
      })
        .setAttribute(type, value, validity)
        .then((tx: string) => transactionListener(provider, tx, callback))
        .catch((err: Error) => reject(err))
    )
  })
