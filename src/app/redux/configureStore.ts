import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import identityReducer, { IdentityStateInterface } from './identity/reducer'

const middleware = [thunk, createLogger()]

export interface stateInterface {
  identity: IdentityStateInterface
}

const rootReducer = combineReducers({
  identity: identityReducer
})

const configureStore = (prelodedState?: any) =>
  createStore(rootReducer, prelodedState, applyMiddleware(...middleware))

export default configureStore
