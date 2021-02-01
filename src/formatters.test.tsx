import { createDidFormat, truncateAddressDid } from './formatters'

describe('helpers.js', () => {
  const address = '0x3Dd03d7d6c3137f1Eb7582Ba5957b8A2e26f304A'

  describe('function: createDidFormat', () => {
    it('creates correct format', () => {
      expect(createDidFormat(address, 1)).toBe(`did:ethr:${address}`)
      expect(createDidFormat(address, 3)).toBe(`did:ethr:ropsten:${address}`)
      expect(createDidFormat(address, 4)).toBe(`did:ethr:rinkeby:${address}`)
      expect(createDidFormat(address, 5)).toBe(`did:ethr:goerli:${address}`)
      expect(createDidFormat(address, 30)).toBe(`did:ethr:rsk:${address}`)
      expect(createDidFormat(address, 31)).toBe(`did:ethr:rsk:testnet:${address}`)
      expect(createDidFormat(address, 42)).toBe(`did:ethr:kovan:${address}`)
      expect(createDidFormat(address, 5777)).toBe(`did:ethr:development:${address}`)
    })
  })

  describe('function: truncateDid', () => {
    it('truncates an address', () => {
      expect(truncateAddressDid(address)).toBe('0x3Dd0...304A')
    })

    it('truncates a DID and leaves the prefix', () => {
      expect(truncateAddressDid(`did:rsk:${address}`)).toBe('did:rsk:0x3Dd0...304A')
    })
  })
})
