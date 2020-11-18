import { connect } from 'react-redux'
import LoginScreenComponent from './LoginScreenComponent'
import { login } from '../state/operations/identity'

const mapDispatchToProps = (dispatch: any) => ({
  handleLogin: (context: any) => dispatch(login(context))
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleLogin: () => dispatchProps.handleLogin(ownProps.context)
})

export default connect(null, mapDispatchToProps, mergeProps)(LoginScreenComponent)
