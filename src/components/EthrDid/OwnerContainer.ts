import { connect } from 'react-redux'
import { stateInterface } from '../../app/redux/configureStore'
import OwnerComponent from './OwnerComponent'

const mapStateToProps = (state: stateInterface) => ({
  owner: state.ethrdid.resolve?.id
  // setOwner: () => console.log('setting owner!')
})

export default connect(mapStateToProps)(OwnerComponent)
