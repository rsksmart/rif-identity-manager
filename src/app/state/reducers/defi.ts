import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Token {
  address: string,
  name?: string | null,
  symbol?: string | null,
  balance?: number | null,
  conversion?: number
}

export const tokenInitialState: Token = {
  address: '',
  name: null,
  symbol: null,
  balance: 0,
  conversion: undefined
}

export interface DefiState {
  tokens: Token[],
  balance: number | null,
  conversion: number | null
}

export const initialState = {
  tokens: [],
  balance: null,
  conversion: null
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
    },
    receiveConversionBalance (state: DefiState, { payload: { usd } }: PayloadAction<{ usd: number }>) {
      state.conversion = usd
    }
  }
})

export const { addTokenData, receiveBalance, receiveConversionBalance } = defiSlice.actions

export default defiSlice.reducer
