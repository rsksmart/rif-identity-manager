import { displayIdentity } from './helpers'

describe('displayIdentity: function', () => {
  const address = '0x3Dd03d7d6c3137f1Eb7582Ba5957b8A2e26f304A'
  it('works without setting a chainId', () => {
    expect(displayIdentity(address)).toBe('0x3Dd0...304A')
  })

  it('creates correct identity with prefix', () => {
    expect(displayIdentity(address, 1)).toBe('did:eth:0x3Dd0...304A')
    expect(displayIdentity(address, 30)).toBe('did:rsk:0x3Dd0...304A')
    expect(displayIdentity(address, 31)).toBe('did:rsk:testnet:0x3Dd0...304A')
  })
})
