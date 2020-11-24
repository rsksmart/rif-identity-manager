import { Dispatch } from 'react'
import { getAccountAndNetwork } from '../../../ethrpc'
import { rLogin } from '../../../features/rLogin'

import { changeAccount, changeChainId } from '../reducers/identity'
import { resolveDidDocument } from './ethrdid'
import { getTokenList } from './tokens'

/**
 * Login into web3 provider via rLogin
 * Saves the web3 provider into context and saves address and chainId to redux
 * @param context the app context where the provider will be ser
 */
export const login = (context: any) => (dispatch: Dispatch<any>) =>
  rLogin.connect().then((provider: any) => {
    context.setProvider(provider)

    getAccountAndNetwork(provider).then(([address, chainId]) => {
      dispatch(changeAccount({ address }))
      dispatch(changeChainId({ chainId: parseInt(chainId) }))

      dispatch(resolveDidDocument(provider))
      dispatch(getTokenList(provider, chainId))
    })
  })
    .catch((err: string) => console.log('rLogin Error', err))
