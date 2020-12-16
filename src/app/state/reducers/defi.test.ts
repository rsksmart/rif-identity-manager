import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import tokenSlice, { addTokenData, DefiState, initialState, tokenInitialState, receiveGas } from './defi'

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

    test('receiveGas', () => {
      expect(receiveGas({ gas: 0.1268 })).toEqual({ type: receiveGas.type, payload: { gas: 0.1268 } })
    })
  })

  describe('reducer', () => {
    let store: Store<DefiState, AnyAction>

    beforeEach(() => {
      store = configureStore({ reducer: tokenSlice })
    })

    test('initial State', () => {
      expect(store.getState()).toEqual(initialState)
    })

    test('it adds token if it does not exist', () => {
      store.dispatch(addTokenData({ data: { address: '0x987' } }))

      expect(store.getState()).toEqual({
        ...initialState,
        tokens: [
          { ...tokenInitialState, address: '0x987' }
        ]
      })
    })

    test('it adds items one at at time', () => {
      store.dispatch(addTokenData({ data: { address: '0x123', name: 'test' } }))
      store.dispatch(addTokenData({ data: { address: '0x123', symbol: 'TEST' } }))
      store.dispatch(addTokenData({ data: { address: '0x123', balance: 6 } }))

      expect(store.getState()).toEqual({
        ...initialState,
        tokens: [
          { address: '0x123', balance: 6, name: 'test', symbol: 'TEST' }
        ]
      })
    })

    test('does not add the same token twice', () => {
      store.dispatch(addTokenData({ data: { address: '0x123' } }))
      store.dispatch(addTokenData({ data: { address: '0x123' } }))

      expect(store.getState()).toEqual({
        ...initialState,
        tokens: [{ ...tokenInitialState, address: '0x123' }]
      })
    })

    test('does not add same token twice with different caps', () => {
      store.dispatch(addTokenData({ data: { address: '0x123A' } }))
      store.dispatch(addTokenData({ data: { address: '0x123a', name: 'CAPS' } }))

      expect(store.getState()).toEqual({
        ...initialState,
        tokens: [{ ...tokenInitialState, address: '0x123a', name: 'CAPS' }]
      })
    })
  })
})
