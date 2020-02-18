import connectForm from 'utils/connect-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { actions } from 'react-redux-form'
import api from 'api'

const selector = createStructuredSelector({
  email: state => state.signup.user.email,
  password: state => state.signup.user.password,
})

export default compose(
  connect(selector),
  connectForm({
    form: 'signup',
    action: 'signup',
    after: (dispatch, { email, password, history }) => {
      dispatch(api.actions.login({ auth: { email, password } }))
      dispatch(actions.reset('signup'))
      history.push('/')
    },
  }),
)
