import { configureStore, Store, AnyAction } from '@reduxjs/toolkit'
import dataVaultSlice, { DataVaultState, receiveKeyData, initialState, addContentToKey, removeContentfromKey, swapContentById, DataVaultContent, receiveStorageInformation, receiveKeys, reset } from './datavault'

describe('dataVault slice', () => {
  describe('action creators', () => {
    test('receiveData', () => {
      const content = [{ id: '1', content: 'hello' }]
      expect(receiveKeyData({ key: 'KEY', content }))
        .toEqual({ type: receiveKeyData.type, payload: { key: 'KEY', content } })
    })

    test('addContentToKey', () => {
      const content = { key: 'KEY', content: { id: '1', content: 'hello' } }
      expect(addContentToKey(content)).toEqual({ type: addContentToKey.type, payload: content })
    })

    test('removeContentfromKey', () => {
      expect(removeContentfromKey({ key: 'KEY', id: '2' })).toEqual({ type: removeContentfromKey.type, payload: { key: 'KEY', id: '2' } })
    })

    test('swapContentById', () => {
      const content = { key: 'KEY', id: '2', content: 'new' }
      expect(swapContentById(content)).toEqual({ type: swapContentById.type, payload: content })
    })

    test('receiveStorageInformation', () => {
      const storage = { used: 150, available: 200 }
      expect(receiveStorageInformation({ storage })).toEqual({ type: receiveStorageInformation.type, payload: { storage } })
    })

    test('receiveKeys', () => {
      const keys = ['ONE', 'TWO']
      expect(receiveKeys({ keys })).toEqual({ type: receiveKeys.type, payload: { keys } })
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

    test('it resets', () => {
      store.dispatch(receiveKeys({ keys: ['oneDD', 'twoCredential'] }))
      store.dispatch(addContentToKey({ key: 'twoCredential', content: { id: '2', content: 'bye' } }))
      store.dispatch(reset())
      expect(store.getState()).toEqual(initialState)
    })

    describe('receiveKeyData', () => {
      test('receiveKeyData', () => {
        const content = [{ id: '1', content: 'hello' }, { id: '2', content: 'bye' }]
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content }))

        expect(store.getState().declarativeDetails).toEqual({ MY_KEY: content })
      })

      test('receiveKeyData from multiple keys', () => {
        const content1 = [{ id: '1', content: 'hello' }]
        const content2 = [{ id: '2', content: 'bye' }]

        store.dispatch(receiveKeyData({ key: 'KEY1', content: content1 }))
        store.dispatch(receiveKeyData({ key: 'KEY2', content: content2 }))

        expect(store.getState().declarativeDetails).toEqual({ KEY1: content1, KEY2: content2 })
      })

      test('receiveKeyData with credentials', () => {
        const content = [{ id: '2', content: 'bye' }]
        store.dispatch(receiveKeyData({ key: 'SomethingCredential', content }))
        expect(store.getState()).toMatchObject({
          declarativeDetails: {},
          credentials: { SomethingCredential: content },
          storage: undefined
        })
      })
    })

    describe('addContentToKey', () => {
      test('add additional data to key', () => {
        const content = [{ id: '1', content: 'hello' }]
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content }))
        store.dispatch(addContentToKey({ key: 'MY_KEY', content: { id: '2', content: 'bye' } }))

        expect(store.getState().declarativeDetails)
          .toEqual({ MY_KEY: [{ id: '1', content: 'hello' }, { id: '2', content: 'bye' }] })
      })

      test('add content to key that does not exist', () => {
        store.dispatch(addContentToKey({ key: 'NEW_KEY', content: { id: '1', content: 'hello' } }))

        expect(store.getState().declarativeDetails)
          .toEqual({ NEW_KEY: [{ id: '1', content: 'hello' }] })
      })

      test('adds a credential', () => {
        const content = { id: '1', content: 'jwt' }
        store.dispatch(addContentToKey({ key: 'MY_KEYCredential', content }))

        const state = store.getState()
        expect(state.declarativeDetails).toEqual({})
        expect(state.credentials).toEqual({ MY_KEYCredential: [content] })
      })
    })

    describe('removeContentfromKey', () => {
      beforeEach(() => {
        const content = [{ id: '1', content: 'hello' }, { id: '2', content: 'hello' }]
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content }))
      })

      test('it deletes an item', () => {
        store.dispatch(removeContentfromKey({ key: 'MY_KEY', id: '2' }))
        expect(store.getState().declarativeDetails).toEqual({ MY_KEY: [{ id: '1', content: 'hello' }] })
      })

      test('it deletes the key if there is no content left', () => {
        store.dispatch(removeContentfromKey({ key: 'MY_KEY', id: '1' }))
        store.dispatch(removeContentfromKey({ key: 'MY_KEY', id: '2' }))

        expect(store.getState().declarativeDetails).toEqual({})
      })

      test('it deletes credentials from list', () => {
        const content = [{ id: '3', content: 'theCredential' }, { id: '4', content: 'c2' }]
        store.dispatch(receiveKeyData({ key: 'helloCredential', content }))

        store.dispatch(removeContentfromKey({ key: 'helloCredential', id: '3' }))
        expect(store.getState().credentials).toEqual({ helloCredential: [{ id: '4', content: 'c2' }] })
      })
    })

    describe('swapContentById', () => {
      const initContent = [{ id: '1', content: 'hello' }, { id: '2', content: 'hello' }]

      beforeEach(() => {
        store.dispatch(receiveKeyData({ key: 'MY_KEY', content: initContent }))
      })

      test('it swaps content of existing key', () => {
        store.dispatch(swapContentById({ id: '1', content: 'newContent', key: 'MY_KEY' }))

        const id1 = store.getState().declarativeDetails.MY_KEY.filter((item: DataVaultContent) => item.id === '1')[0]
        expect(id1.content).toBe('newContent')
      })

      test('it keeps content when id is invalid', () => {
        store.dispatch(swapContentById({ id: '15', content: 'newContent', key: 'MY_KEY' }))
        expect(store.getState().declarativeDetails.MY_KEY).toMatchObject(initContent)
      })
    })

    describe('receiveStorageInformation', () => {
      test('it receives storage information', () => {
        store.dispatch(receiveStorageInformation({ storage: { used: 10, available: 15 } }))
        expect(store.getState().storage).toMatchObject({ used: 10, available: 15 })
      })
    })

    describe('receiveKeys', () => {
      test('it receives keys', () => {
        store.dispatch(receiveKeys({ keys: ['oneDD', 'twoCredential'] }))

        expect(store.getState()).toEqual({
          credentials: {
            twoCredential: []
          },
          declarativeDetails: {
            oneDD: []
          },
          storage: undefined
        })
      })
    })
  })
})
