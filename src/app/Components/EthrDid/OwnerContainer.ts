import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { stateInterface } from '../../state/configureStore'
import { setDidOwner } from '../../state/operations/ethrdid'
import OwnerComponent from './OwnerComponent'
import { getOwnerFromDidDoc } from './helpers'

const mapStateToProps = (state: stateInterface) => ({
  owner: getOwnerFromDidDoc(state.ethrdid.didDocument),
  isOwner: getOwnerFromDidDoc(state.ethrdid.didDocument)?.toLowerCase() === state.identity.address?.toLowerCase(),
  chainId: state.identity.chainId
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  changeOwner: (provider: any, newOwner: string) => dispatch(setDidOwner(provider, newOwner))
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerComponent)
