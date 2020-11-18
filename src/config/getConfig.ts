/* eslint-disable no-unused-vars */
import Ethereum from './config.ethereum.json'
import Mainnet from './config.mainnet.json'
import Testnet from './config.testnet.json'
import Local from './config.local.json'

export enum SETTINGS {
  ETHR_DID_CONTRACT = 'ethrDid',
  RPC_URL = 'rpcUrl'
}

export const getSetting = (chainId: number, setting: SETTINGS) => {
  switch (chainId) {
    case 1: return Ethereum[setting]
    case 30: return Mainnet[setting]
    case 31: return Testnet[setting]
    case 5777: return Local[setting]
    default: throw new Error(`No setting for chainId ${chainId}`)
  }
}
