import connectForm from 'utils/connect-form'
import { actions } from 'react-redux-form'

export default connectForm({
  form: 'changeUserPassword',
  action: 'updateCurrentUserPassword',
  after: (dispatch, props) => {
    props.history.push('/my-account')
    dispatch(actions.reset('changeUserPassword'))
  },
})
