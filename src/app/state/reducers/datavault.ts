import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DataVaultKey {
  key: string,
  content: string[]
}

export interface DataVaultState {
  data: DataVaultKey[]
}

export const initialState: DataVaultState = {
  data: []
}

const dataVaultSlice = createSlice({
  name: 'datavault',
  initialState,
  reducers: {
    receiveKeyData (state: DataVaultState, { payload: { key, content } }: PayloadAction<DataVaultKey>) {
      state.data.push({ key, content })
    }
  }
})

export const { receiveKeyData } = dataVaultSlice.actions

export default dataVaultSlice.reducer
