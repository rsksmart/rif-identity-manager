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
  data: DataVaultKey
  storage?: DataVaultStorageState
}

export const initialState: DataVaultState = {
  data: {},
  storage: undefined
}

const dataVaultSlice = createSlice({
  name: 'datavault',
  initialState,
  reducers: {
    receiveKeyData (state: DataVaultState, { payload: { key, content } }: PayloadAction<ReceivePayLoad>) {
      state.data[key] = content
    },
    addContentToKey (state: DataVaultState, { payload: { key, content } }: PayloadAction<{ key: string, content: DataVaultContent }>) {
      state.data[key] ? state.data[key].push(content) : state.data[key] = [content]
    },
    removeContentfromKey (state: DataVaultState, { payload: { key, id } }: PayloadAction<{ key: string, id: string }>) {
      state.data[key] = state.data[key].filter((item: DataVaultContent) => item.id !== id)
    },
    swapContentById (state: DataVaultState, { payload: { key, id, content } }: PayloadAction<SwapPayLoad>) {
      state.data[key] = state.data[key].map((item: DataVaultContent) => item.id === id ? { ...item, content } : item)
    },
    receiveStorageInformation (state: DataVaultState, { payload: { storage } }: PayloadAction<{ storage: DataVaultStorageState }>) {
      state.storage = storage
    }
  }
})

export const { receiveKeyData, addContentToKey, removeContentfromKey, swapContentById, receiveStorageInformation } = dataVaultSlice.actions

export default dataVaultSlice.reducer
