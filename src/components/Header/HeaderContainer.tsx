import { connect } from 'react-redux'
import { stateInterface } from '../../app/state/configureStore'
import HeaderComponent from './HeaderComponent'

const mapStateToProps = (state: stateInterface) => ({
  did: state.ethrdid.didDocument?.id,
  chainId: state.identity.chainId
})

export default connect(mapStateToProps)(HeaderComponent)
