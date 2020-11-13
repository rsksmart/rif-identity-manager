import { IDENTITY_ACTION_TYPES } from './actions'

export interface IdentityStateInterface {
  address: string | null
  chainId: number | null
}

const initialState = {
  address: null,
  chainId: null
}

const identityReducer = (state: IdentityStateInterface = initialState, action: any) => {
  switch (action.type) {
    case IDENTITY_ACTION_TYPES.RECEIVE_IDENTITY:
      return {
        ...state,
        address: action.address
      }
    case IDENTITY_ACTION_TYPES.RECEIVE_CHAINID:
      return {
        ...state,
        chainId: action.chainId
      }
    default: return state
  }
}

export default identityReducer
