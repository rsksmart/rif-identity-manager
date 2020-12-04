import { connect } from 'react-redux'
import { Authentication, DIDDocument, PublicKey } from 'did-resolver'
import { stateInterface } from '../state/configureStore'
import DasboardScreen from './DashboardScreen'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { setDidOwner, addDelegate } from '../state/operations/ethrdid'
import { addCustomToken } from '../state/operations/tokens'

const getOwnerFromDidDoc = (didDocument: DIDDocument) => {
  const controller = didDocument.publicKey.filter((pk: PublicKey) => pk.id.endsWith('#controller'))[0]
  return (typeof controller === 'undefined') ? null : controller.ethereumAddress
}

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId,
  tokens: state.tokens.tokens,
  owner: getOwnerFromDidDoc(state.ethrdid.didDocument),
  delegates: state.ethrdid.didDocument.authentication?.filter((pk: Authentication) => !pk.publicKey.endsWith('controller')),
  storage: state.datavault.storage
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  changeOwner: (provider: any, newOwner: string) => dispatch(setDidOwner(provider, newOwner)),
  addDelegate: (provider: any, newDelegate: string) => dispatch(addDelegate(provider, newDelegate)),
  addCustomToken: (provider: any, userAddr: string, tokenAddr: string, chainId: number) => dispatch(addCustomToken(provider, userAddr, tokenAddr, chainId))
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  addCustomToken: (provider: any, tokenAddr: string) => dispatchProps.addCustomToken(provider, stateProps.address, tokenAddr, stateProps.chainId)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DasboardScreen)
