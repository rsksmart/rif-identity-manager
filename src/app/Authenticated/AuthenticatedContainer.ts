import { connect } from 'react-redux'
import { stateInterface } from '../state/configureStore'
import AuthenticatedComponent from './AuthenticatedComponent'

/**
 * Get items that are specifically to edit the Persona
 * @param data Data from the datavault
 */
const getPersonaDeclarativeDetails = (data:any) => {
  const emptyValue = [{ id: '', content: '' }]
  return {
    DD_NAME: data.DD_NAME || emptyValue,
    DD_EMAIL: data.DD_EMAIL || emptyValue
  }
}

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId,
  persona: getPersonaDeclarativeDetails(state.datavault.data)
})

export default connect(mapStateToProps)(AuthenticatedComponent)
