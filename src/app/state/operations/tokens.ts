import { Dispatch } from 'react'
import Eth from 'ethjs-query'
import EthContract from 'ethjs-contract'
import BN from 'bn.js'
import erc20abi from './erc20.json'
import { addTokenData } from '../reducers/tokens'
import { getTokens } from '../../../config/getConfig'
import { saveToLocalStorage, getValueFromLocalStorage } from '../../../storage/localStorage'

export const getTokenList = (provider: any, chainId: string, userAddress: string) => (dispatch: Dispatch<any>) => {
  const tokens = getTokens(parseInt(chainId))
  const localTokens = getValueFromLocalStorage(chainId, 'TOKEN') ? getValueFromLocalStorage(chainId, 'TOKEN') : []

  const all = tokens.concat(localTokens)
  Array.isArray(all) && all.map((address: string) => {
    dispatch(getToken(provider, address, userAddress))
  })
}

export const getToken = (provider: any, address: string, userAddress: string, onComplete?: any) => (dispatch: Dispatch<any>) => {
  const eth = new Eth(provider)
  const ethContract = new EthContract(eth)
  const token = ethContract(erc20abi).at(address)

  eth.getCode(address).then((result: string) => {
    if (result === '0x0') {
      return onComplete && onComplete(new Error('The address is not a contract'))
    }

    token.symbol().then((symbol: string[]) => symbol[0])
      .then((symbol: string) => dispatch(addTokenData({ data: { address, symbol } })))
      .catch((err: Error) => console.log('symbol', err.message))

    token.name().then((name: string) => name[0])
      .then((name: string) => dispatch(addTokenData({ data: { address, name } })))
      .catch((err: Error) => console.log('name', err.message))

    token.decimals().then((decimals: BN[]) => decimals[0])
      .then((decimals: BN) => {
        token.balanceOf(userAddress)
          .then((balance: BN[]) => balance[0])
          .then((balance: BN) => balance.div(new BN(10).pow(decimals)).toNumber())
          .then((balance: number) => {
            balance !== 0 && dispatch(addTokenData({ data: { address, balance } }))
            onComplete && onComplete(true)
          })
          .catch((err: Error) => console.log('balanceOf error', err))
      })
      .catch(() => onComplete && onComplete(new Error('The address is a contract but not ERC20 or ERC721 token.')))
  })
}

export const addCustomToken = (provider: any, userAddress: string, address: string, chainId: number) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    const onComplete = (response: any) =>
      response instanceof Error
        ? reject(response)
        : resolve(saveToLocalStorage(chainId.toString(), 'TOKEN', address))

    dispatch(getToken(provider, address, userAddress, onComplete))
  })
