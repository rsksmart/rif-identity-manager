import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { stateInterface } from '../state/configureStore'
import DataVaultComponent from './DataVaultComponent'
import { AnyAction } from 'redux'
import { createDataVaultContent, deleteDataVaultContent } from '../state/operations/datavault'

const mapStateToProps = (state: stateInterface) => ({
  declarativeDetails: state.datavault.data
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDeclarativeDetail: (client: DataVaultWebClient, key: string, content: string) =>
    dispatch(createDataVaultContent(client, key, content)),
  deleteValue: (client: DataVaultWebClient, key: string, id: string) =>
    dispatch(deleteDataVaultContent(client, key, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataVaultComponent)
