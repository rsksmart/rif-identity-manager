import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DataVaultKey {
  key: string,
  content: string[]
}

export interface DataVaultState {
  hasDataVault: boolean
  data: DataVaultKey[]
}

export const initialState: DataVaultState = {
  hasDataVault: false,
  data: []
}

const dataVaultSlice = createSlice({
  name: 'datavault',
  initialState,
  reducers: {
    receiveHasDataVault (state: DataVaultState) {
      state.hasDataVault = true
    },
    receiveKeyData (state: DataVaultState, { payload: { key, content } }: PayloadAction<DataVaultKey>) {
      if (state.data.filter((item: DataVaultKey) => item.key === key).length === 0) {
        state.data.push({ key, content })
      } else {
        state.data = state.data.map((item: DataVaultKey) =>
          item.key === key ? { key, content: [...item.content, ...content] } : item)
      }
    }
  }
})

export const { receiveHasDataVault, receiveKeyData } = dataVaultSlice.actions

export default dataVaultSlice.reducer
