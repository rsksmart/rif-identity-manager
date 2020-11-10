import { connect } from 'react-redux'
import { stateInterface } from '../../redux/configureStore'
import { receiveChainId, receiveIdentity } from '../../redux/identity/actions'
import IdentityInformationPanel from '../components/IdentityInformation'

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId
})

const mapDispatchToProps = (dispatch: any) => ({
  update: () => {
    dispatch(receiveIdentity('0x1234567890123456780'))
    dispatch(receiveChainId(1))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(IdentityInformationPanel)
