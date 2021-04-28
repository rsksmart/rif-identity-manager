import { Dispatch } from 'react'

import { getAccountAndNetwork } from '../../../ethrpc'
import { rLogin, clearRloginStorage } from '../../../features/rLogin'

import { changeAccount, changeChainId, reset as resetIdentity } from '../reducers/identity'
import { resolveDidDocument } from './ethrdid'
import { getBalance, getTokenList } from './defi'
import { dataVaultStart } from './datavault'

import { reset as resetDV } from '../reducers/datavault'
import { reset as resetDefi } from '../reducers/defi'
import { reset as resetEthrDid } from '../reducers/ethrdid'

/**
 * Login into web3 provider via rLogin
 * Saves the web3 provider into context and saves address and chainId to redux
 * @param context the app context where the provider will be ser
 */
export const login = (context: any) => (dispatch: Dispatch<any>) =>
  rLogin.connect().then(({ provider }: any) => {
    context.setProvider(provider)

    getAccountAndNetwork(provider).then(([address, chainId]) => {
      dispatch(changeAccount({ address }))
      dispatch(changeChainId({ chainId: parseInt(chainId) }))

      dispatch(resolveDidDocument(provider))
      dispatch(getTokenList(provider, parseInt(chainId), address))
      dispatch(getBalance(provider, address))

      const callback = (dvClient: any, _error: any) => context.setDvClient(dvClient)
      dispatch(dataVaultStart(provider, address, chainId, callback))
    })
  })
    .catch((err: string) => console.log('rLogin Error', err))

/**
 * Dispatch reset on all reducers back to InitialState
 */
export const resetReducers = () => (dispatch: Dispatch<any>) => {
  dispatch(resetDV())
  dispatch(resetDefi())
  dispatch(resetEthrDid())
  dispatch(resetIdentity())
}

/**
 * Logout of App completely removing localStorage, resetting reducers, and restting context
 */
export const logout = () => (dispatch: Dispatch<any>) => {
  rLogin.clearCachedProvider()
  clearRloginStorage()
  dispatch(resetReducers())
}
