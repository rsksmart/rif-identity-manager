import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DataVaultContent {
  id: string,
  content: string
}

export interface DataVaultKey {
  [key: string]: DataVaultContent[]
}

interface ReceivePayLoad {
  key: string,
  content: DataVaultContent[]
}

interface SwapPayLoad {
  key: string,
  id: string,
  content: string
}

export interface DataVaultStorageState {
  used: number,
  available: number,
}

export interface DataVaultState {
  declarativeDetails: DataVaultKey
  credentials: DataVaultKey
  storage?: DataVaultStorageState
}

export const initialState: DataVaultState = {
  declarativeDetails: {},
  credentials: {},
  storage: undefined
}

const getBucket = (key: string) => key.endsWith('Credential') ? 'credentials' : 'declarativeDetails'

const dataVaultSlice = createSlice({
  name: 'datavault',
  initialState,
  reducers: {
    receiveKeyData (state: DataVaultState, { payload: { key, content } }: PayloadAction<ReceivePayLoad>) {
      state[getBucket(key)][key] = content
    },
    addContentToKey (state: DataVaultState, { payload: { key, content } }: PayloadAction<{ key: string, content: DataVaultContent }>) {
      const type = key.endsWith('Credential') ? 'credentials' : 'declarativeDetails'
      state[type][key] ? state[type][key].push(content) : state[type][key] = [content]
    },
    removeContentfromKey (state: DataVaultState, { payload: { key, id } }: PayloadAction<{ key: string, id: string }>) {
      const bucket = getBucket(key)
      state[bucket][key] = state[bucket][key].filter((item: DataVaultContent) => item.id !== id)

      if (state[bucket][key].length === 0) {
        delete state[bucket][key]
      }
    },
    swapContentById (state: DataVaultState, { payload: { key, id, content } }: PayloadAction<SwapPayLoad>) {
      state.declarativeDetails[key] = state.declarativeDetails[key].map((item: DataVaultContent) => item.id === id ? { ...item, content } : item)
    },
    receiveStorageInformation (state: DataVaultState, { payload: { storage } }: PayloadAction<{ storage: DataVaultStorageState }>) {
      state.storage = storage
    },
    receiveKeys (state: DataVaultState, { payload: { keys } }: PayloadAction<{ keys: string[] }>) {
      keys.forEach((key: string) => {
        key.endsWith('Credential') ? state.credentials[key] = [] : state.declarativeDetails[key] = []
      })
    },
    reset: _state => initialState
  }
})

export const { receiveKeyData, addContentToKey, removeContentfromKey, swapContentById, receiveStorageInformation, receiveKeys, reset } = dataVaultSlice.actions

export default dataVaultSlice.reducer
