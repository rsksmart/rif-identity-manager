import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import IdentityComponent from './IdentityComponent'
import { stateInterface } from '../state/configureStore'

const mapStateToProps = (state: stateInterface) => ({
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(IdentityComponent)
