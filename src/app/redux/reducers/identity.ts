import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IdentityState {
  address: string | null
  chainId: number | null
}

interface ReceiveIdentityPayload {
  address: string
}

interface ReceiveChainIdPayload {
  chainId: number
}

export const initialState: IdentityState = {
  address: null,
  chainId: null
}

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    receiveIdentity (state: IdentityState, { payload: { address } }: PayloadAction<ReceiveIdentityPayload>) {
      state.address = address
    },
    receiveChainId (state: IdentityState, { payload: { chainId } }: PayloadAction<ReceiveChainIdPayload>) {
      state.chainId = chainId
    }
  }
})

export const { receiveIdentity, receiveChainId } = identitySlice.actions

export default identitySlice.reducer
