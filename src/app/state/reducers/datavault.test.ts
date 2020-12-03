import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import dataVaultSlice, { DataVaultState, receiveKeyData, initialState, addContentToKey, removeContentfromKey, swapContentById, DataVaultKey, DataVaultContent } from './datavault'

describe('dataVault slice', () => {
  describe('action creators', () => {
    test('receiveData', () => {
      const content = [{ id: '1', content: 'hello' }]
      expect(receiveKeyData({ key: 'KEY', content }))
        .toEqual({ type: receiveKeyData.type, payload: { key: 'KEY', content } })
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

    describe('receiveKeyData', () => {
      test('receiveKeyData', () => {
        const content = [{ id: '1', content: 'hello' }, { id: '2', content: 'bye' }]
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content }))

        expect(store.getState().data).toEqual({ MY_KEY: content })
      })

      test('receiveKeyData from multiple keys', () => {
        const content1 = [{ id: '1', content: 'hello' }]
        const content2 = [{ id: '2', content: 'bye' }]

        store.dispatch(receiveKeyData({ key: 'KEY1', content: content1 }))
        store.dispatch(receiveKeyData({ key: 'KEY2', content: content2 }))

        expect(store.getState().data).toEqual({ KEY1: content1, KEY2: content2 })
      })
    })

    describe('addContentToKey', () => {
      test('add additional data to key', () => {
        const content = [{ id: '1', content: 'hello' }]
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content }))
        store.dispatch(addContentToKey({ key: 'MY_KEY', content: { id: '2', content: 'bye' } }))

        expect(store.getState().data)
          .toEqual({ MY_KEY: [{ id: '1', content: 'hello' }, { id: '2', content: 'bye' }] })
      })

      test('add content to key that does not exist', () => {
        store.dispatch(addContentToKey({ key: 'NEW_KEY', content: { id: '1', content: 'hello' } }))

        expect(store.getState().data)
          .toEqual({ NEW_KEY: [{ id: '1', content: 'hello' }] })
      })
    })

    describe('removeContentfromKey', () => {
      beforeEach(() => {
        const content = [{ id: '1', content: 'hello' }, { id: '2', content: 'hello' }]
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content }))
      })

      test('it deletes an item', () => {
        store.dispatch(removeContentfromKey({ key: 'MY_KEY', id: '2' }))
        expect(store.getState().data).toEqual({ MY_KEY: [{ id: '1', content: 'hello' }] })
      })

      test('it deletes multiple items', () => {
        store.dispatch(removeContentfromKey({ key: 'MY_KEY', id: '1' }))
        store.dispatch(removeContentfromKey({ key: 'MY_KEY', id: '2' }))

        expect(store.getState().data).toEqual({ MY_KEY: [] })
      })
    })

    describe('swapContentById', () => {
      const initContent = [{ id: '1', content: 'hello' }, { id: '2', content: 'hello' }]

      beforeEach(() => {
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content: initContent }))
      })

      test('it swaps content of existing key', () => {
        store.dispatch(swapContentById({ id: '1', content: 'newContent', key: 'MY_KEY' }))

        const id1 = store.getState().data.MY_KEY.filter((item: DataVaultContent) => item.id === '1')[0]
        expect(id1.content).toBe('newContent')
      })

      test('it keeps content when id is invalid', () => {
        store.dispatch(swapContentById({ id: '15', content: 'newContent', key: 'MY_KEY' }))
        expect(store.getState().data.MY_KEY).toMatchObject(initContent)
      })
    })
  })
})
