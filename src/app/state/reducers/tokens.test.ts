import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import tokenSlice, { addToken, addTokenData, TokenState, initialState } from './tokens'

describe('token slide', () => {
  describe('action creators', () => {
    test('addToken', () => {
      expect(addToken({ address: '0x123' })).toEqual({ type: addToken.type, payload: { address: '0x123' } })
    })

    test('addTokenData', () => {
      const data = {
        address: '0x123',
        balance: 4,
        symbol: 'TEST',
        name: 'Test Coin'
      }
      expect(addTokenData({ data })).toEqual({ type: addTokenData.type, payload: { data } })
    })
  })

  describe('reducer', () => {
    let store: Store<TokenState, AnyAction>

    beforeEach(() => {
      store = configureStore({ reducer: tokenSlice })
    })

    test('initial State', () => {
      expect(store.getState()).toEqual(initialState)
    })

    test('addToken', () => {
      store.dispatch(addToken({ address: '0x123' }))
      expect(store.getState()).toEqual({
        tokens: [
          { address: '0x123', balance: null, name: null, symbol: null, conversion: null }
        ]
      })
    })

    test('addToken multiple', () => {
      store.dispatch(addToken({ address: '0x123' }))
      store.dispatch(addToken({ address: '0x456' }))
      expect(store.getState()).toEqual({
        tokens: [
          { address: '0x123', balance: null, name: null, symbol: null, conversion: null },
          { address: '0x456', balance: null, name: null, symbol: null, conversion: null }
        ]
      })
    })

    test('addTokendata', () => {
      store.dispatch(addToken({ address: '0x123' }))
      store.dispatch(addTokenData({ data: { address: '0x123', name: 'test' } }))
      store.dispatch(addTokenData({ data: { address: '0x123', symbol: 'TEST' } }))
      store.dispatch(addTokenData({ data: { address: '0x123', balance: 6 } }))

      expect(store.getState()).toEqual({
        tokens: [
          { address: '0x123', balance: 6, name: 'test', symbol: 'TEST', conversion: null }
        ]
      })
    })
  })
})
