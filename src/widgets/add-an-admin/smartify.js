import connectForm from 'utils/connect-form'
import { compose } from 'redux'
import { actions } from 'react-redux-form'

const MODEL = 'admin'

export default compose(
  connectForm({
    form: MODEL,
    action: 'createAdmin',
    after: dispatch => dispatch(actions.reset(MODEL)),
  }),
)
