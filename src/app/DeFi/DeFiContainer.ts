import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { stateInterface } from '../state/configureStore'
import DeFiComponent from './DeFiComponent'
import { AnyAction } from 'redux'
import { addCustomToken } from '../state/operations/defi'

const mapStateToProps = (state: stateInterface) => ({
  tokens: state.defi.tokens,
  chainId: state.identity.chainId,
  balance: state.defi.balance,
  conversion: state.defi.conversion
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addCustomToken: (provider: any, userAddr: string, tokenAddr: string, chainId: number) => dispatch(addCustomToken(provider, userAddr, tokenAddr, chainId))
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  addCustomToken: (provider: any, tokenAddr: string) => dispatchProps.addCustomToken(provider, stateProps.address, tokenAddr, stateProps.chainId)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DeFiComponent)
