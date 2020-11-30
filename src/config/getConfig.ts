/* eslint-disable no-unused-vars */
import Ethereum from './config.ethereum.json'
import Mainnet from './config.mainnet.json'
import Testnet from './config.testnet.json'
import Local from './config.local.json'

export enum SETTINGS {
  ETHR_DID_CONTRACT = 'ethrDid',
  RPC_URL = 'rpcUrl',
  TOKENS = 'tokens'
}

const getSetting = (chainId: number, setting: SETTINGS) => {
  switch (chainId) {
    case 1: return Ethereum[setting]
    case 30: return Mainnet[setting]
    case 31: return Testnet[setting]
    case 5777: return Local[setting]
    default: throw new Error(`No setting for chainId ${chainId}`)
  }
}

export const getDIDRegistryAddress = (chainId: number) => getSetting(chainId, SETTINGS.ETHR_DID_CONTRACT)
export const getRPCUrl = (chainId: number) => getSetting(chainId, SETTINGS.RPC_URL)
export const getTokens = (chainId: number) => getSetting(chainId, SETTINGS.TOKENS)
export const getDataVault = () => ({
  serviceDid: 'did:ethr:rsk:testnet:0x285B30492a3F444d78f75261A35cB292Fc8F41A6',
  serviceUrl: 'http://ec2-3-131-142-122.us-east-2.compute.amazonaws.com:5107'
})
