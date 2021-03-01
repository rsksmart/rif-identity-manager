import { connect } from 'react-redux'
import { stateInterface } from '../state/configureStore'
import DasboardScreen from './DashboardScreen'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { addCustomToken } from '../state/operations/defi'
import { Token } from '../state/reducers/defi'

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId,
  tokens: state.defi.tokens,
  balance: state.defi.balance,
  converstion: state.defi.conversion,
  featuredTokens: state.defi.tokens.filter((token: Token) => token.symbol === 'RIF' || token.symbol === 'tRIF'),
  storage: state.datavault.storage
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addCustomToken: (provider: any, userAddr: string, tokenAddr: string, chainId: number) => dispatch(addCustomToken(provider, userAddr, tokenAddr, chainId))
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DasboardScreen)
