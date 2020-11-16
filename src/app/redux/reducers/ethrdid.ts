import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DIDDocument } from 'did-resolver'

export interface EtherdidState {
  owner: string | null,
  resolve: DIDDocument | null
}

interface ChangeOwnerPayload {
  owner: string
}

interface ResolveDidPayload {
  data: DIDDocument
}

export const initialState: EtherdidState = {
  owner: null,
  resolve: null
}

const ethrDidSlice = createSlice({
  name: 'ethrdid',
  initialState,
  reducers: {
    changeOwner (state: EtherdidState, { payload: { owner } }: PayloadAction<ChangeOwnerPayload>) {
      state.owner = owner
    },
    resolveDid (state: EtherdidState, { payload: { data } }: PayloadAction<ResolveDidPayload>) {
      state.resolve = data
    }
  }
})

export const { changeOwner, resolveDid } = ethrDidSlice.actions

export default ethrDidSlice.reducer
