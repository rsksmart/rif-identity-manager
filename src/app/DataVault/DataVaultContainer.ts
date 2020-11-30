import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { stateInterface } from '../state/configureStore'
import DataVaultComponent from './DataVaultComponent'
import { AnyAction } from 'redux'
import { createDataVaultContent } from '../state/operations/datavault'

const mapStateToProps = (state: stateInterface) => ({
  declarativeDetails: state.datavault.data
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDeclarativeDetail: (client: DataVaultWebClient, type: string, content: string) =>
    dispatch(createDataVaultContent(client, type, content))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataVaultComponent)
