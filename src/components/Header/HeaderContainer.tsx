import { connect } from 'react-redux'
import { stateInterface } from '../../app/redux/configureStore'
import HeaderComponent from './HeaderComponent'

const mapStateToProps = (state: stateInterface) => ({
  did: state.ethrdid.resolve?.id,
  chainId: state.identity.chainId
})

export default connect(mapStateToProps)(HeaderComponent)
