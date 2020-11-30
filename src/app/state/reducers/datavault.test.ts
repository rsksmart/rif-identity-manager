import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import dataVaultSlice, { DataVaultState, receiveKeyData, receiveHasDataVault, initialState } from './datavault'

describe('dataVault slice', () => {
  describe('action creators', () => {
    test('receiveData', () => {
      expect(receiveKeyData({ key: 'KEY', content: ['hello'] }))
        .toEqual({ type: receiveKeyData.type, payload: { key: 'KEY', content: ['hello'] } })
    })

    test('hasDataVault', () => {
      expect(receiveHasDataVault()).toEqual({ type: receiveHasDataVault.type })
    })
  })

  describe('reducer', () => {
    let store: Store<DataVaultState, AnyAction>

    beforeEach(() => {
      store = configureStore({ reducer: dataVaultSlice })
    })

    test('initial state', () => {
      expect(store.getState()).toEqual(initialState)
    })

    test('receiveHasDataVault', () => {
      store.dispatch(receiveHasDataVault())
      expect(store.getState().hasDataVault).toBeTruthy()
    })

    test('receiveData', () => {
      const singleKey = { key: 'MY_KEY', content: ['content', 'content2'] }
      store.dispatch(receiveKeyData(singleKey))

      expect(store.getState().data)
        .toEqual([{ key: 'MY_KEY', content: ['content', 'content2'] }])
    })

    test('add additional data to key', () => {
      const singleKey = { key: 'MY_KEY', content: ['content'] }
      store.dispatch(receiveKeyData(singleKey))

      const newData = { key: 'MY_KEY', content: ['new_content'] }
      store.dispatch(receiveKeyData(newData))

      expect(store.getState().data)
        .toEqual([{ key: 'MY_KEY', content: ['content', 'new_content'] }])
    })
  })
})