import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import { stateInterface } from '../state/configureStore'
import DataVaultComponent from './DataVaultComponent'
import { AnyAction } from 'redux'
import { createDataVaultContent, deleteDataVaultContent, swapDataVaultContent, downloadBackup, getDataVaultContent } from '../state/operations/datavault'

const mapStateToProps = (state: stateInterface) => ({
  declarativeDetails: state.datavault.declarativeDetails,
  credentials: state.datavault.credentials,
  address: state.identity.address,
  chainId: state.identity.chainId
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDataVaultContent: (client: DataVaultWebClient, key: string, content: string) =>
    dispatch(createDataVaultContent(client, key, content)),
  deleteValue: (client: DataVaultWebClient, key: string, id: string) =>
    dispatch(deleteDataVaultContent(client, key, id)),
  swapValue: (client: DataVaultWebClient, key: string, content: string, id: string) =>
    dispatch(swapDataVaultContent(client, key, content, id)),
  downloadBackup: (client: DataVaultWebClient) => downloadBackup(client),
  getKeyContent: (client: DataVaultWebClient, key: string) =>
    dispatch(getDataVaultContent(client, key))
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DataVaultComponent)
