import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import { DIDDocument } from 'did-resolver'
import ethrdidSlice, { EtherdidState, initialState, resolveDid } from './ethrdid'

describe('ethrdid slice', () => {
  const data: DIDDocument = {
    '@context': 'https://w3id.org/did/v1',
    id: '',
    publicKey: [],
    authentication: []
  }

  describe('action creators', () => {
    test('resolveDid', () => {
      expect(resolveDid({ data })).toEqual({ type: resolveDid.type, payload: { data } })
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

    test('resolveDid', () => {
      store.dispatch(resolveDid({ data }))
      expect(store.getState()).toEqual({
        ...initialState,
        didDocument: data
      })
    })
  })
})
