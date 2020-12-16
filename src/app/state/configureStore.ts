import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import identityReducer, { IdentityState } from './reducers/identity'
import ethrdidReducer, { EtherdidState } from './reducers/ethrdid'
import defiReducer, { DefiState } from './reducers/defi'
import dataVaultReducer, { DataVaultState } from './reducers/datavault'

const middleware = [thunk, createLogger()]

export interface stateInterface {
  identity: IdentityState
  ethrdid: EtherdidState
  defi: DefiState
  datavault: DataVaultState
}

const rootReducer = combineReducers({
  identity: identityReducer,
  ethrdid: ethrdidReducer,
  defi: defiReducer,
  datavault: dataVaultReducer
})

const configureStore = (prelodedState?: any) =>
  createStore(rootReducer, prelodedState, applyMiddleware(...middleware))

export default configureStore
