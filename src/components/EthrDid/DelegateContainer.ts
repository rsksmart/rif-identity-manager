import { Authentication } from 'did-resolver'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { stateInterface } from '../../app/redux/configureStore'
import { addDelegate } from '../../app/redux/operations/ethrdid'
import DelegateComponent from './DelegateComponent'

const mapStateToProps = (state: stateInterface) => ({
  delegates: state.ethrdid.resolve?.authentication?.filter((pk: Authentication) => !pk.publicKey.endsWith('controller')),
  chainId: state.identity.chainId
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDelegate: (provider: any, newDelegate: string) => dispatch(addDelegate(provider, newDelegate))
})

export default connect(mapStateToProps, mapDispatchToProps)(DelegateComponent)
