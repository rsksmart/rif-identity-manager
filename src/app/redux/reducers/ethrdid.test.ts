import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import ethrdidSlice, { changeOwner, EtherdidState, initialState } from './ethrdid'

describe('ethrdid slice', () => {
  const owner = '0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a'
  describe('action creators', () => {
    test('changeOwner', () => {
      expect(changeOwner({ owner })).toEqual({ type: changeOwner.type, payload: { owner } })
    })
  })

  describe('reducer', () => {
    let store: Store<EtherdidState, AnyAction>

    beforeEach(() => {
      store = configureStore({ reducer: ethrdidSlice })
    })

    test('initial state', () => {
      expect(store.getState()).toEqual(initialState)
    })

    test('change owner', () => {
      store.dispatch(changeOwner({ owner }))
      expect(store.getState()).toEqual({
        ...initialState,
        owner
      })
    })
  })
})
