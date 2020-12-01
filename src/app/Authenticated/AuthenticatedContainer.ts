import { connect } from 'react-redux'
import { stateInterface } from '../state/configureStore'
import AuthenticatedComponent from './AuthenticatedComponent'

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId
})

export default connect(mapStateToProps)(AuthenticatedComponent)
