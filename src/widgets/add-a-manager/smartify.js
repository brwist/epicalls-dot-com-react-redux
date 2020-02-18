import connectForm from 'utils/connect-form'
import { compose } from 'redux'
import { actions } from 'react-redux-form'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { companies } from 'selectors'

const selectors = createStructuredSelector({
  companies,
})

const MODEL = 'manager'

export default compose(
  connect(selectors),
  connectForm({
    form: MODEL,
    action: 'createManager',
    after: dispatch => dispatch(actions.reset(MODEL)),
  }),
)
