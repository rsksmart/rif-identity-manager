import { connect } from 'react-redux'
import LoginScreenComponent from './LoginScreenComponent'
import { login } from '../state/operations/identity'

const mapDispatchToProps = (dispatch: any) => ({
  handleLogin: (context: any, cacheProvider: string | null) => dispatch(login(context, cacheProvider))
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleLogin: (cacheProvider: string | null) => dispatchProps.handleLogin(ownProps.context, cacheProvider)
})

export default connect(null, mapDispatchToProps, mergeProps)(LoginScreenComponent)
