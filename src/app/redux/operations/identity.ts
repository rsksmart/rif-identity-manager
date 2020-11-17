import { Dispatch } from 'react'
import { getAccounts, getNetwork } from '../../../ethrpc'
import { rLogin } from '../../../rLogin'

import { changeAccount, changeChainId } from '../reducers/identity'
import { lookupOwner, resolve } from './ethrdid'

/**
 * Login into web3 provider via rLogin
 * Saves the web3 provider into context and saves address and chainId to redux
 * @param context the app context where the provider will be ser
 */
export const login = (context: any) => (dispatch: Dispatch<any>) =>
  rLogin.connect().then((provider: any) => {
    context.setProvider(provider)

    getAccounts(provider).then((accounts: string[]) => dispatch(changeAccount({ address: accounts[0] })))
    getNetwork(provider).then((chainId: string) => dispatch(changeChainId({ chainId: parseInt(chainId) })))

    dispatch(lookupOwner(provider))
    dispatch(resolve(provider))
  })
    .catch((err: string) => console.log('rLogin Error', err))
