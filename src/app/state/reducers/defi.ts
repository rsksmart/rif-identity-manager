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

export interface DefiState {
  tokens: Token[],
  balance: number | null
}

export const initialState = {
  tokens: [],
  balance: null
}

interface addTokenDataPayload {
  data: Token
}

const defiSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    addTokenData (state: DefiState, { payload: { data } }: PayloadAction<addTokenDataPayload>) {
      const formattedPayload = { ...data, address: data.address.toLowerCase() }
      if (state.tokens.filter((item: Token) => item.address === formattedPayload.address).length === 0) {
        state.tokens.push({ ...tokenInitialState, ...formattedPayload })
      } else {
        state.tokens = state.tokens.map((item: Token) =>
          (item.address === formattedPayload.address) ? { ...item, ...formattedPayload } : item)
      }
    },
    receiveBalance (state: DefiState, { payload: { balance } }: PayloadAction<{ balance: number }>) {
      state.balance = balance
    }
  }
})

export const { addTokenData, receiveBalance } = defiSlice.actions

export default defiSlice.reducer
