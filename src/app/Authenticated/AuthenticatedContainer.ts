import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { stateInterface } from '../state/configureStore'
import AuthenticatedComponent from './AuthenticatedComponent'
import { decryptMultipleKeys, modifyMultipleItems } from '../state/operations/datavault'
import { DataVaultKey } from '../state/reducers/datavault'
import { logout, resetReducers } from '../state/operations/identity'

/**
 * Get items that are specifically to the Persona from the DataVault collection
 * @param data Data from the datavault
 */
export const getPersonaDeclarativeDetails = (data: DataVaultKey) => {
  const personaItems = ['DD_NAME', 'DD_EMAIL', 'DD_ADDRESS', 'DD_IDNUMBER', 'DD_PHONE', 'DD_BIRTHDATE']

  const returnValueOrEmpty = (key: string) => {
    // key is set and data is decrypted
    if (data[key] && data[key][0]) {
      return data[key]
    }

    // key is loaded, but no content
    if (data[key] && !data[key][0]) {
      return [{ id: '', content: 'ENCRYPTED' }]
    }

    // no key
    return [{ id: '', content: '' }]
  }

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
    dispatch(modifyMultipleItems(client, items)),
  decryptPersona: (client: DataVaultWebClient | null, keys: string[]) => client && dispatch(decryptMultipleKeys(client, keys)),
  logoutOrSwitchAccounts: (isLoggingOut: boolean) => isLoggingOut ? dispatch(logout()) : dispatch(resetReducers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
