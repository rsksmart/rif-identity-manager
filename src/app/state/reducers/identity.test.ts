import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import identitySlice, { changeAccount, changeChainId, IdentityState, initialState, reset } from './identity'

describe('identity slide', () => {
  const address = '0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
  describe('action creators', () => {
    test('change identity', () => {
      expect(changeAccount({ address })).toEqual({ type: changeAccount.type, payload: { address } })
    })

    test('change ChainId', () => {
      expect(changeChainId({ chainId: 30 })).toEqual({ type: changeChainId.type, payload: { chainId: 30 } })
    })
  })

  describe('reducer', () => {
    let store: Store<IdentityState, AnyAction>

    beforeEach(() => {
      store = configureStore({ reducer: identitySlice })
    })

    test('initial state', () => {
      expect(store.getState()).toEqual(initialState)
    })

    test('change identity', () => {
      store.dispatch(changeAccount({ address }))
      expect(store.getState()).toEqual({
        ...initialState,
        address
      })
    })

    test('change chainId', () => {
      store.dispatch(changeChainId({ chainId: 30 }))
      expect(store.getState()).toEqual({
        ...initialState,
        chainId: 30
      })
    })

    test('reset', () => {
      store.dispatch(changeAccount({ address }))
      store.dispatch(changeChainId({ chainId: 30 }))
      store.dispatch(reset())
      expect(store.getState()).toEqual(initialState)
    })
  })
})
