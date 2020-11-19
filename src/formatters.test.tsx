import { createDidFormat, displayIdentity, truncateAddressDid } from './formatters'

describe('helpers.js', () => {
  const address = '0x3Dd03d7d6c3137f1Eb7582Ba5957b8A2e26f304A'
  describe('function: displayIdentity', () => {
    it('works without setting a chainId', () => {
      expect(displayIdentity(address)).toBe('0x3Dd0...304A')
    })

    it('creates correct identity with prefix', () => {
      expect(displayIdentity(address, 1)).toBe('did:eth:0x3Dd0...304A')
      expect(displayIdentity(address, 30)).toBe('did:rsk:0x3Dd0...304A')
      expect(displayIdentity(address, 31)).toBe('did:rsk:testnet:0x3Dd0...304A')
    })
  })

  describe('function: createDidFormat', () => {
    it('creates correct formats', () => {
      expect(createDidFormat(address, 1)).toBe(`did:mainnet:${address}`)
      expect(createDidFormat(address, 30)).toBe(`did:rsk:${address}`)
    })

    it('creates correct format with eth when requested', () => {
      expect(createDidFormat(address, 1, true)).toBe(`did:ethr:mainnet:${address}`)
      expect(createDidFormat(address, 30, true)).toBe(`did:ethr:rsk:${address}`)
      expect(createDidFormat(address, 31, true)).toBe(`did:ethr:rsk:testnet:${address}`)
      expect(createDidFormat(address, 5777, true)).toBe(`did:ethr:development:${address}`)
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
