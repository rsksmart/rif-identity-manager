import { Dispatch } from 'react'
import { getAccountAndNetwork } from '../../../ethrpc'
import { rLogin } from '../../../features/rLogin'

import { changeAccount, changeChainId } from '../reducers/identity'
import { resolveDidDocument } from './ethrdid'
import { getBalance, getTokenList } from './defi'
import { createClient, getDataVaultContent, getStorageInformation } from './datavault'
import { createDidFormat } from '../../../formatters'

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
      dispatch(getTokenList(provider, parseInt(chainId), address))
      dispatch(getBalance(provider, address))

      const dataVaultClient = createClient(provider, address, chainId)
      context.setDvClient(dataVaultClient)

      dataVaultClient && dispatch(getDataVaultContent(dataVaultClient, createDidFormat(address, chainId)))
      dataVaultClient && dispatch(getStorageInformation(dataVaultClient))
    })
  })
    .catch((err: string) => console.log('rLogin Error', err))
