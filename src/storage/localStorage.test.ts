import { saveToLocalStorage, getValueFromLocalStorage } from './localStorage'

describe('localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('saveToLocalStorage', () => {
    it('should create localStorage variable for each chainId', () => {
      saveToLocalStorage('1', 'KEY', 'chain-1')
      saveToLocalStorage('30', 'KEY', 'chain-30')

      expect(localStorage.getItem('id-manager-settings-1')).toEqual('{"KEY":["chain-1"]}')
      expect(localStorage.getItem('id-manager-settings-30')).toEqual('{"KEY":["chain-30"]}')
    })

    it('adds multiple keys to a single chainId', () => {
      saveToLocalStorage('1', 'KEY', '1')
      saveToLocalStorage('1', 'KEY2', '2')

      expect(localStorage.getItem('id-manager-settings-1'))
        .toEqual('{"KEY":["1"],"KEY2":["2"]}')
    })

    it('adds multiple values to a single key', () => {
      saveToLocalStorage('1', 'KEY', '1')
      saveToLocalStorage('1', 'KEY', '2')
      saveToLocalStorage('1', 'KEY', '3')

      expect(localStorage.getItem('id-manager-settings-1'))
        .toEqual('{"KEY":["1","2","3"]}')
    })
  })

  describe('getValueFromLocalStorage', () => {
    it('gets the value from a chainId and key', () => {
      saveToLocalStorage('1', 'MY_KEY', '1')
      expect(JSON.parse(getValueFromLocalStorage('1', 'MY_KEY'))).toEqual(1)
    })

    it('gets null from invalid chainId', () => {
      expect(getValueFromLocalStorage('4', 'KEY')).toBeNull()
    })

    it('gets the null from invalid key', () => {
      saveToLocalStorage('1', 'OTHER_KEY', '1')
      expect(getValueFromLocalStorage('1', 'INVALID_KEY')).toBeNull()
    })
  })
})
