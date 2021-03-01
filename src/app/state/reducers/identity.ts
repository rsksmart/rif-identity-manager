import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IdentityState {
  address: string
  chainId: number | null
}

interface ChangeAccountPayload {
  address: string
}

interface ChangeChainIdPayload {
  chainId: number
}

export const initialState: IdentityState = {
  address: '',
  chainId: null
}

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    changeAccount (state: IdentityState, { payload: { address } }: PayloadAction<ChangeAccountPayload>) {
      state.address = address
    },
    changeChainId (state: IdentityState, { payload: { chainId } }: PayloadAction<ChangeChainIdPayload>) {
      state.chainId = chainId
    },
    reset: _state => initialState
  }
})

export const { changeAccount, changeChainId, reset } = identitySlice.actions

export default identitySlice.reducer
