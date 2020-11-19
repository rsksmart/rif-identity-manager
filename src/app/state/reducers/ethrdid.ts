import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DIDDocument } from 'did-resolver'

export interface EtherdidState {
  didDocument: DIDDocument
}

interface ResolveDidPayload {
  data: DIDDocument
}

export const initialState: EtherdidState = {
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
    resolveDid (state: EtherdidState, { payload: { data } }: PayloadAction<ResolveDidPayload>) {
      state.didDocument = data
    }
  }
})

export const { resolveDid } = ethrDidSlice.actions

export default ethrDidSlice.reducer
