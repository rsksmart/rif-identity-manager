import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import identityReducer, { IdentityState } from './reducers/identity'
import ethrdidReducer, { EtherdidState } from './reducers/ethrdid'

const middleware = [thunk, createLogger()]

export interface stateInterface {
  identity: IdentityState,
  ethrdid: EtherdidState
}

const rootReducer = combineReducers({
  identity: identityReducer,
  ethrdid: ethrdidReducer
})

const configureStore = (prelodedState?: any) =>
  createStore(rootReducer, prelodedState, applyMiddleware(...middleware))

export default configureStore
