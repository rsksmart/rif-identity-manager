import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import identityReducer, { IdentityState } from './reducers/identity'
import ethrdidReducer, { EtherdidState } from './reducers/ethrdid'
import tokenReducer, { TokenState } from './reducers/tokens'

const middleware = [thunk, createLogger()]

export interface stateInterface {
  identity: IdentityState,
  ethrdid: EtherdidState,
  tokens: TokenState
}

const rootReducer = combineReducers({
  identity: identityReducer,
  ethrdid: ethrdidReducer,
  tokens: tokenReducer
})

const configureStore = (prelodedState?: any) =>
  createStore(rootReducer, prelodedState, applyMiddleware(...middleware))

export default configureStore
