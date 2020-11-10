/* eslint-disable no-unused-vars */
export enum IDENTITY_ACTION_TYPES {
  RECEIVE_IDENTITY = 'RECEIVE_IDENTITY',
  RECEIVE_CHAINID = 'RECEIVE_CHAINID'
}

export const receiveIdentity = (address: string) => ({
  type: IDENTITY_ACTION_TYPES.RECEIVE_IDENTITY,
  address
})

export const receiveChainId = (chainId: number) => ({
  type: IDENTITY_ACTION_TYPES.RECEIVE_CHAINID,
  chainId
})
