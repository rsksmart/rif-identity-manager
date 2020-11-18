import { Authentication } from 'did-resolver'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { stateInterface } from '../../state/configureStore'
import { addDelegate } from '../../state/operations/ethrdid'
import DelegateComponent from './DelegateComponent'
import { getOwnerFromDidDoc } from './helpers'

const mapStateToProps = (state: stateInterface) => ({
  delegates: state.ethrdid.didDocument.authentication?.filter((pk: Authentication) => !pk.publicKey.endsWith('controller')),
  isOwner: getOwnerFromDidDoc(state.ethrdid.didDocument)?.toLowerCase() === state.identity.address?.toLowerCase(),
  chainId: state.identity.chainId
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDelegate: (provider: any, newDelegate: string) => dispatch(addDelegate(provider, newDelegate))
})

export default connect(mapStateToProps, mapDispatchToProps)(DelegateComponent)
