import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DIDDocument } from 'did-resolver'

export interface EtherdidState {
  owner: string,
  didDocument: DIDDocument
}

interface ChangeOwnerPayload {
  owner: string
}

interface ResolveDidPayload {
  data: DIDDocument
}

export const initialState: EtherdidState = {
  owner: '',
  didDocument: {
    '@context': 'https://w3id.org/did/v1',
    id: '',
    publicKey: [],
    authentication: []
  }
}

const ethrDidSlice = createSlice({
  name: 'ethrdid',
  initialState,
  reducers: {
    changeOwner (state: EtherdidState, { payload: { owner } }: PayloadAction<ChangeOwnerPayload>) {
      state.owner = owner
    },
    resolveDid (state: EtherdidState, { payload: { data } }: PayloadAction<ResolveDidPayload>) {
      state.didDocument = data
    }
  }
})

export const { changeOwner, resolveDid } = ethrDidSlice.actions

export default ethrDidSlice.reducer
