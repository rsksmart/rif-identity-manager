import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import identitySlice, { receiveIdentity, receiveChainId, IdentityState, initialState } from './identity'

describe('identity slide', () => {
  const address = '0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
  describe('action creators', () => {
    test('receive identity', () => {
      expect(receiveIdentity({ address })).toEqual({ type: receiveIdentity.type, payload: { address } })
    })

    test('receive ChainId', () => {
      expect(receiveChainId({ chainId: 30 })).toEqual({ type: receiveChainId.type, payload: { chainId: 30 } })
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

    test('receive identity', () => {
      store.dispatch(receiveIdentity({ address }))
      expect(store.getState()).toEqual({
        ...initialState,
        address
      })
    })

    test('receive chainId', () => {
      store.dispatch(receiveChainId({ chainId: 30 }))
      expect(store.getState()).toEqual({
        ...initialState,
        chainId: 30
      })
    })
  })
})
