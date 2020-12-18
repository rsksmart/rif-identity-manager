import { Dispatch } from 'react'
import Eth from 'ethjs-query'
import EthContract from 'ethjs-contract'
import BN from 'bn.js'
import erc20abi from './erc20.json'
import { addTokenData, receiveBalance, receiveConversionBalance } from '../reducers/defi'
import getTokenContracts, { TokenMetadataPair, TokenMetadata, mapToCoinGeckoToAddress } from '../../../config/getTokenContracts'
import { saveToLocalStorage, getValueFromLocalStorage } from '../../../storage/localStorage'
import Axios, { AxiosResponse } from 'axios'
import { getCoinGeckoIdsForNetwork } from '../../../config/getConfig'

export const getTokenList = (provider: any, chainId: number, userAddress: string) => (dispatch: Dispatch<any>) => {
  // get the set token list for the specific chainId
  dispatch(getSetTokenList(provider, userAddress, chainId))

  // get conversion rates for tokenlist that are in CoinGecko
  dispatch(getConversionRates(chainId))

  // local tokens that were saved in localStorage
  const localTokens = getValueFromLocalStorage(chainId.toString(), 'TOKEN') ? getValueFromLocalStorage(chainId.toString(), 'TOKEN') : []
  localTokens.map((address: string) => {
    dispatch(getTokenWithMetadata(provider, address, userAddress))
  })
}

/**
 * Loops through the contract metadata as specificed by @rsksmart/rsk-[testnet-]contract-metadata
 * @param provider web3 provider
 * @param userAddress users Address
 * @param chainId id of the network
 */
const getSetTokenList = (provider: any, userAddress: string, chainId: number) => (dispatch: Dispatch<any>) => {
  const allTokens = getTokenContracts(chainId) as TokenMetadataPair
  if (!allTokens) {
    return
  }

  const eth = new Eth(provider)
  const ethContract = new EthContract(eth)
  for (const address in allTokens) {
    const metadata = allTokens[address] as TokenMetadata

    if (metadata.erc20) {
      ethContract(erc20abi).at(address).balanceOf(userAddress)
        .then((balance: BN[]) => balance[0])
        .then((balance: BN) => balance.div(new BN(10).pow(new BN(metadata.decimals))).toNumber())
        .then((balance: number) => {
          if (balance !== 0) {
            dispatch(addTokenData({ data: { address, balance, name: metadata.name, symbol: metadata.symbol } }))
          }
        })
        .catch((err: Error) => console.log('balanceOf error', err))
    }
  }
}

/**
 * Get balance and metadata for a specific token
 * @param provider web3 Provider
 * @param address contract address
 * @param userAddress address of the user to query balance
 * @param onComplete callback function to be called
 */
export const getTokenWithMetadata = (provider: any, address: string, userAddress: string, onComplete?: any) => (dispatch: Dispatch<any>) => {
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

/**
 * Watch a custom token that the user has inputed the address for
 * @param provider web3 provider
 * @param userAddress user's address
 * @param address contract address to query
 * @param chainId chain Id
 */
export const addCustomToken = (provider: any, userAddress: string, address: string, chainId: number) => (dispatch: Dispatch<any>) =>
  new Promise((resolve, reject) => {
    const onComplete = (response: any) =>
      response instanceof Error
        ? reject(response)
        : resolve(saveToLocalStorage(chainId.toString(), 'TOKEN', address))

    dispatch(getTokenWithMetadata(provider, address, userAddress, onComplete))
  })

/**
 * Get the default balance of the user
 * @param provider web3 provider
 * @param address address of the user
 */
export const getBalance = (provider: any, address: string) => (dispatch: Dispatch<any>) =>
  new Eth(provider).getBalance(address)
    .then((balance: BN) => parseInt(balance.toString()))
    .then((balance: number) => balance / Math.pow(10, 18))
    .then((balance:number) => dispatch(receiveBalance({ balance })))

/**
 * Gets the Token to USD conversion rate
 * @param address Token address, used for storing it in redux
 * @param geckoIds Ids of the coin for coingecko's AIP
 */
export const getConversionRates = (chainId: number) => (dispatch: Dispatch<any>) => {
  const geckoIds = getCoinGeckoIdsForNetwork(chainId)
  if (!geckoIds) {
    return
  }

  Axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${geckoIds}&vs_currencies=usd`)
    .then((response: AxiosResponse) => response.data)
    .then((data: { [name: string]: { usd: number } }) => {
      for (const geckoId in data) {
        const address = mapToCoinGeckoToAddress(geckoId, chainId)
        if (address === 'defaultBalance') {
          dispatch(receiveConversionBalance(data[geckoId]))
        } else if (address) {
          dispatch(addTokenData({ data: { address: address, conversion: data[geckoId].usd } }))
        }
      }
    })
}
