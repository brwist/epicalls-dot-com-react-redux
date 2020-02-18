import connectForm from 'utils/connect-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { actions } from 'react-redux-form'

const selector = createStructuredSelector({
  email: state => state.addUserEmail.email.email,
})

export default compose(
  connect(selector),
  connectForm({
    form: 'addUserEmail',
    action: 'addEmail',
    after: dispatch => dispatch(actions.reset('addUserEmail.commonErrors')),
  }),
)
