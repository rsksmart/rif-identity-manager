import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { DIDDocument, PublicKey } from 'did-resolver'
import IdentityComponent from './IdentityComponent'
import { stateInterface } from '../state/configureStore'
import { setDidOwner, addDelegate, addAttribute } from '../state/operations/ethrdid'

const getOwnerFromDidDoc = (didDocument: DIDDocument) => {
  const controller = didDocument.publicKey.filter((pk: PublicKey) => pk.id.endsWith('#controller'))[0]
  return (typeof controller === 'undefined') ? null : controller.ethereumAddress
}

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId,
  owner: getOwnerFromDidDoc(state.ethrdid.didDocument),
  delegates: state.ethrdid.didDocument.publicKey?.filter((pk: PublicKey) => !pk.id.endsWith('controller')),
  service: state.ethrdid.didDocument.service,
  publicKeys: state.ethrdid.didDocument.publicKey?.filter((pk: PublicKey) => pk.publicKeyBase64 || pk.publicKeyHex)
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  changeOwner: (provider: any, newOwner: string) => dispatch(setDidOwner(provider, newOwner)),
  addDelegate: (provider: any, newDelegate: string) => dispatch(addDelegate(provider, newDelegate)),
  addAttribute: (provider: any, type: string, value: string, validity: number) =>
    dispatch(addAttribute(provider, type, value, validity))
})

export default connect(mapStateToProps, mapDispatchToProps)(IdentityComponent)
