import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import tokenSlice, { addTokenData, DefiState, initialState, tokenInitialState, receiveBalance, receiveConversionBalance } from './defi'

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

    test('receiveBalance', () => {
      expect(receiveBalance({ balance: 0.1268 })).toEqual({ type: receiveBalance.type, payload: { balance: 0.1268 } })
    })

    test('receiveConversionBalance', () => {
      expect(receiveConversionBalance({ usd: 15 })).toEqual({ type: receiveConversionBalance.type, payload: { usd: 15 } })
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
      store.dispatch(addTokenData({ data: { address: '0x123', conversion: 15 } }))

      expect(store.getState()).toEqual({
        ...initialState,
        tokens: [
          { address: '0x123', balance: 6, name: 'test', symbol: 'TEST', conversion: 15 }
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

    test('it receives a balance amount', () => {
      store.dispatch(receiveBalance({ balance: 1.846 }))
      expect(store.getState().balance).toEqual(1.846)
    })

    test('it receives the conversion for balance', () => {
      store.dispatch(receiveConversionBalance({ usd: 18 }))
      expect(store.getState().conversion).toEqual(18)
    })
  })
})
