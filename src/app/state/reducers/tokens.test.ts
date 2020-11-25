import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import tokenSlice, { addTokenData, TokenState, initialState, tokenInitialState } from './tokens'

describe('token slide', () => {
  describe('action creators', () => {
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

    test('it adds token if it does not exist', () => {
      store.dispatch(addTokenData({ data: { address: '0x987' } }))

      expect(store.getState()).toEqual({
        tokens: [
          { ...tokenInitialState, address: '0x987' }
        ]
      })
    })

    test('addTokendata', () => {
      store.dispatch(addTokenData({ data: { address: '0x123', name: 'test' } }))
      store.dispatch(addTokenData({ data: { address: '0x123', symbol: 'TEST' } }))
      store.dispatch(addTokenData({ data: { address: '0x123', balance: 6 } }))

      expect(store.getState()).toEqual({
        tokens: [
          { ...tokenInitialState, address: '0x123', balance: 6, name: 'test', symbol: 'TEST' }
        ]
      })
    })

    test('does not add the same token twice', () => {
      store.dispatch(addTokenData({ data: { address: '0x123' } }))
      store.dispatch(addTokenData({ data: { address: '0x123' } }))

      expect(store.getState()).toEqual({
        tokens: [
          { ...tokenInitialState, address: '0x123' }
        ]
      })
    })

    test('does not add same token twice with different caps', () => {
      store.dispatch(addTokenData({ data: { address: '0x123A' } }))
      store.dispatch(addTokenData({ data: { address: '0x123a', name: 'CAPS' } }))

      expect(store.getState()).toEqual({
        tokens: [
          { ...tokenInitialState, address: '0x123a', name: 'CAPS' }
        ]
      })
    })
  })
})
