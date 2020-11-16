import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { stateInterface } from '../../app/redux/configureStore'
import { setDidOwner } from '../../app/redux/operations/ethrdid'
import OwnerComponent from './OwnerComponent'

const mapStateToProps = (state: stateInterface) => ({
  owner: state.ethrdid.owner,
  isOwner: state.ethrdid.owner === state.identity.address,
  chainId: state.identity.chainId
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  changeOwner: (provider: any, newOwner: string) => dispatch(setDidOwner(provider, newOwner))
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerComponent)
