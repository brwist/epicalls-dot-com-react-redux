import connectForm from 'utils/connect-form'
import { compose } from 'redux'
import { actions } from 'react-redux-form'

const MODEL = 'pricing'

export default compose(
  connectForm({
    form: MODEL,
    action: 'createPricing',
    after: dispatch => dispatch(actions.reset(MODEL)),
  }),
)
