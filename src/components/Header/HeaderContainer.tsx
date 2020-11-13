import { connect } from 'react-redux'
import { stateInterface } from '../../app/redux/configureStore'
import HeaderComponent from './HeaderComponent'

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId
})

export default connect(mapStateToProps)(HeaderComponent)
