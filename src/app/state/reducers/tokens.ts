import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Token {
  address: string,
  name?: string | null,
  symbol?: string | null,
  balance?: number | null
}

export const tokenInitialState: Token = {
  address: '',
  name: null,
  symbol: null,
  balance: 0
}

export interface TokenState {
  tokens: Token[]
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
    addTokenData (state: TokenState, { payload: { data } }: PayloadAction<addTokenDataPayload>) {
      const formattedPayload = { ...data, address: data.address.toLowerCase() }
      if (state.tokens.filter((item: Token) => item.address === formattedPayload.address).length === 0) {
        state.tokens.push({ ...tokenInitialState, ...formattedPayload })
      } else {
        state.tokens = state.tokens.map((item: Token) =>
          (item.address === formattedPayload.address) ? { ...item, ...formattedPayload } : item)
      }
    }
  }
})

export const { addTokenData } = tokensSlice.actions

export default tokensSlice.reducer
