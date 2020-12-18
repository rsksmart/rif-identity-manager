import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { stateInterface } from '../state/configureStore'
import AuthenticatedComponent from './AuthenticatedComponent'
import { modifyMultipleItems } from '../state/operations/datavault'
import { DataVaultKey } from '../state/reducers/datavault'

/**
 * Get items that are specifically to the Persona from the DataVault collection
 * @param data Data from the datavault
 */
export const getPersonaDeclarativeDetails = (data: DataVaultKey) => {
  const personaItems = ['DD_NAME', 'DD_EMAIL', 'DD_ADDRESS', 'DD_IDNUMBER', 'DD_PHONE', 'DD_BIRTHDATE']
  const returnValueOrEmpty = (key: string) => data[key] && data[key][0] ? data[key] : [{ id: '', content: '' }]

  const values: DataVaultKey = {}
  personaItems.forEach((key: string) => {
    values[key] = returnValueOrEmpty(key)
  })

  return values
}

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId,
  persona: getPersonaDeclarativeDetails(state.datavault.declarativeDetails)
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  modifyMultipleItems: (client: DataVaultWebClient, items: DataVaultKey) =>
    dispatch(modifyMultipleItems(client, items))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
