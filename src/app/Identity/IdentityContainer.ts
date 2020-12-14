import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { Authentication, DIDDocument, PublicKey } from 'did-resolver'
import IdentityComponent from './IdentityComponent'
import { stateInterface } from '../state/configureStore'
import { setDidOwner, addDelegate } from '../state/operations/ethrdid'

const getOwnerFromDidDoc = (didDocument: DIDDocument) => {
  const controller = didDocument.publicKey.filter((pk: PublicKey) => pk.id.endsWith('#controller'))[0]
  return (typeof controller === 'undefined') ? null : controller.ethereumAddress
}

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  owner: getOwnerFromDidDoc(state.ethrdid.didDocument),
  delegates: state.ethrdid.didDocument.authentication?.filter((pk: Authentication) => !pk.publicKey.endsWith('controller'))
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  changeOwner: (provider: any, newOwner: string) => dispatch(setDidOwner(provider, newOwner)),
  addDelegate: (provider: any, newDelegate: string) => dispatch(addDelegate(provider, newDelegate))
})

export default connect(mapStateToProps, mapDispatchToProps)(IdentityComponent)
