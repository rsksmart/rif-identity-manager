import { connect } from 'react-redux'
import { stateInterface } from '../../redux/configureStore'
import IdentityInformationPanel from '../components/IdentityInformation'

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId
})

export default connect(mapStateToProps)(IdentityInformationPanel)
