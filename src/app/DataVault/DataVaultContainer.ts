import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { stateInterface } from '../state/configureStore'
import DataVaultComponent from './DataVaultComponent'
import { AnyAction } from 'redux'

// const mapStateToProps = (state: stateInterface) => ({})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDeclarativeDetail: (type: string, content:string) => new Promise((resolve) => resolve({ type, content }))
})

export default connect(null, mapDispatchToProps)(DataVaultComponent)
