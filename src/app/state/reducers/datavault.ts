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

export interface DataVaultState {
  data: DataVaultKey
}

export const initialState: DataVaultState = {
  data: {}
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
    }
  }
})

export const { receiveKeyData, addContentToKey } = dataVaultSlice.actions

export default dataVaultSlice.reducer
