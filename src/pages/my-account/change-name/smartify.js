import connectForm from 'utils/connect-form'
import { actions } from 'react-redux-form'

export default connectForm({
  form: 'changeUserFirstName',
  action: 'updateCurrentUser',
  after: (dispatch, props) => {
    props.history.push('/my-account')
    dispatch(actions.reset('changeUserFirstName'))
  },
})
