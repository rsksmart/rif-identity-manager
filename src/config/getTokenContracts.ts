import ContractsTestnet from '@rsksmart/rsk-testnet-contract-metadata'
import ContractsMainnet from '@rsksmart/rsk-contract-metadata'

export interface TokenMetadata {
  name: string
  logo: string
  erc20: boolean
  symbol: string
  decimals: number
}

export interface TokenMetadataPair {
  [address: string] : TokenMetadata
}

const getTokenContracts = (chainId: number) => {
  switch (chainId) {
    case 30: return ContractsMainnet
    case 31: return ContractsTestnet
    default: return null
  }
}

/**
 * Converts CoinGecko coin Ids to their address or to the defaultBalance
 * @param symbol CoinGecko's coin/token Id
 * @param chainId ChainId of the network
 */
export const mapToCoinGeckoToAddress = (symbol: string, chainId: number) => {
  switch (symbol) {
    case 'ethereum':
    case 'bitcoin':
      return 'defaultBalance'
    case 'rif-token':
      return chainId === 30
        ? '0x2aCc95758f8b5F583470bA265Eb685a8f45fC9D5' : '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE'
    default: return null
  }
}

export default getTokenContracts
