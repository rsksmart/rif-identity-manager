import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import identityReducer, { IdentityState } from './reducers/identity'

const middleware = [thunk, createLogger()]

export interface stateInterface {
  identity: IdentityState
}

const rootReducer = combineReducers({
  identity: identityReducer
})

const configureStore = (prelodedState?: any) =>
  createStore(rootReducer, prelodedState, applyMiddleware(...middleware))

export default configureStore
