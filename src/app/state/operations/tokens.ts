import { Dispatch } from 'react'
import Eth from 'ethjs'
import erc720 from './erc720.json'
import { getAccounts, getNetwork } from '../../../ethrpc'
import { addToken, addTokenData } from '../reducers/tokens'
import { getTokens } from '../../../config/getConfig'

export const getTokenList = (provider: any) => (dispatch: Dispatch<any>) =>
  getNetwork(provider)
    .then((chainId: string) => {
      const tokens = getTokens(parseInt(chainId))
      Array.isArray(tokens) && tokens.map((address: string) => {
        dispatch(getToken(provider, address))
      })
    })

export const getToken = (provider: any, address: string) => (dispatch: Dispatch<any>) => {
  const eth = new Eth(provider)
  const token = eth.contract(erc720).at(address)

  console.log('eth???', eth)

  eth.getCode(address)
    .then((result: string) => {
      if (result !== '0x0') {
        dispatch(addToken({ address }))

        token.symbol().then((symbol: string[]) => symbol[0])
          .then((symbol: string) => dispatch(addTokenData({ data: { address, symbol } })))
          .catch((err: Error) => console.log('symbol error', err))

        token.name().then((name: string) => name[0])
          .then((name: string) => dispatch(addTokenData({ data: { address, name } })))
          .catch((err: Error) => console.log('name error', err))

        getAccounts(provider).then((accounts: string[]) => {
          token.decimals().then((decimals: any) => {
            token.balanceOf(accounts[0])
              .then((balance: any) =>
                dispatch(addTokenData(
                  { data: { address, balance: balance[0].toString() / Math.pow(10, decimals[0].toNumber()) } }
                ))
              )
              .catch((error: Error) => {
                console.log('!!!!', error)
                return error
              })
          })
        })
      }
    })
}

export const addCustomToken = (provider: any, address: string) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    console.log('adding custom token:', address)
    dispatch(getToken(provider, address))
    resolve()
  })
