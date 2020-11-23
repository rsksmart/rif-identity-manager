import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Token {
  address: string,
  name?: string | null,
  symbol?: string | null,
  balance?: number | null
  conversion?: number | null,
}

export interface TokenState {
  tokens: any
}

export const initialState = {
  tokens: []
}

interface addTokenDataPayload {
  data: Token
}

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    addToken (state: TokenState, { payload: { address } }: PayloadAction<{ address: string }>) {
      state.tokens.push({ address, name: null, symbol: null, balance: null, conversion: null })
    },
    addTokenData (state: TokenState, { payload: { data } }: PayloadAction<addTokenDataPayload>) {
      state.tokens = state.tokens.map((item: Token) =>
        (item.address === data.address) ? { ...item, ...data } : item)
    }
  }
})

export const { addToken, addTokenData } = tokensSlice.actions

export default tokensSlice.reducer
