/* eslint-disable no-unused-vars */
import Ethereum from './config.ethereum.json'
import Mainnet from './config.mainnet.json'
import Testnet from './config.testnet.json'
import Local from './config.local.json'

export enum SETTINGS {
  ETHR_DID_CONTRACT = 'ethrDid',
  RPC_URL = 'rpcUrl',
  DATAVAULT = 'dataVault',
  BALANCE_NAME = 'balanceName',
  COIN_GECKO_IDS = 'coinGeckoIds'
}

const getSetting = (chainId: number, setting: SETTINGS) => {
  switch (chainId) {
    case 1: return Ethereum[setting]
    case 30: return Mainnet[setting]
    case 31: return Testnet[setting]
    default: return Local[setting]
  }
}

export const getDIDRegistryAddress = (chainId: number) => getSetting(chainId, SETTINGS.ETHR_DID_CONTRACT)
export const getRPCUrl = (chainId: number) => getSetting(chainId, SETTINGS.RPC_URL)
export const getDataVault = (chainId: number) => getSetting(chainId, SETTINGS.DATAVAULT)
export const getBalanceName = (chainId: number) => getSetting(chainId, SETTINGS.BALANCE_NAME) as string
export const getCoinGeckoIdsForNetwork = (chainId: number) => getSetting(chainId, SETTINGS.COIN_GECKO_IDS) as string
