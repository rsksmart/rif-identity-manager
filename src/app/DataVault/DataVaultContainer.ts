import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { stateInterface } from '../state/configureStore'
import DataVaultComponent from './DataVaultComponent'
import { AnyAction } from 'redux'
import { createDataVaultContent, deleteDataVaultContent, swapDataVaultContent } from '../state/operations/datavault'

const mapStateToProps = (state: stateInterface) => ({
  declarativeDetails: state.datavault.declarativeDetails,
  credentials: state.datavault.credentials
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDeclarativeDetail: (client: DataVaultWebClient, key: string, content: string) =>
    dispatch(createDataVaultContent(client, key, content)),
  deleteValue: (client: DataVaultWebClient, key: string, id: string) =>
    dispatch(deleteDataVaultContent(client, key, id)),
  swapValue: (client: DataVaultWebClient, key: string, content: string, id: string) =>
    dispatch(swapDataVaultContent(client, key, content, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataVaultComponent)
