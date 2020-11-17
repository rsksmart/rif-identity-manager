import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DIDDocument } from 'did-resolver'

export interface EtherdidState {
  owner: string | null,
  resolve: DIDDocument
}

interface ChangeOwnerPayload {
  owner: string
}

interface ResolveDidPayload {
  data: DIDDocument
}

interface AddDelegatePayload {
  delegate: string
}

export const initialState: EtherdidState = {
  owner: null,
  resolve: {
    '@context': 'https://w3id.org/did/v1',
    id: '',
    publicKey: []
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
      state.resolve = data
    },
    addDelegate (state: EtherdidState, { payload: { delegate } }: PayloadAction<AddDelegatePayload>) {
      if (!state.resolve.authentication) { state.resolve.authentication = [] }
      state.resolve.authentication = [
        ...state.resolve?.authentication,
        {
          publicKey: delegate,
          type: 'Secp256k1SignatureAuthentication2018'
        }
      ]
    }
  }
})

export const { changeOwner, resolveDid, addDelegate } = ethrDidSlice.actions

export default ethrDidSlice.reducer
