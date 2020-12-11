import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { stateInterface } from '../state/configureStore'
import AuthenticatedComponent from './AuthenticatedComponent'
import { modifyMultipleItems } from '../state/operations/datavault'
import { DataVaultKey } from '../state/reducers/datavault'

/**
 * Get items that are specifically to edit the Persona
 * @param data Data from the datavault
 */
const getPersonaDeclarativeDetails = (data:any) => {
  const emptyValue = [{ id: '', content: '' }]
  return {
    DD_NAME: data.DD_NAME && data.DD_NAME[0] ? data.DD_NAME : emptyValue,
    DD_EMAIL: data.DD_EMAIL && data.DD_EMAIL[0] ? data.DD_EMAIL : emptyValue
  }
}

const mapStateToProps = (state: stateInterface) => ({
  address: state.identity.address,
  chainId: state.identity.chainId,
  persona: getPersonaDeclarativeDetails(state.datavault.data)
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  modifyMultipleItems: (client: DataVaultWebClient, items: DataVaultKey) =>
    dispatch(modifyMultipleItems(client, items))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
