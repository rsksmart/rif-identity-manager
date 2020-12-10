import { connect } from 'react-redux'
import { stateInterface } from '../state/configureStore'
import AuthenticatedComponent from './AuthenticatedComponent'

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId,
  name: state.datavault.data.DD_NAME && state.datavault.data.DD_NAME[0].content
})

export default connect(mapStateToProps)(AuthenticatedComponent)
