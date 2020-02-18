import connectForm from 'utils/connect-form'
import { compose } from 'redux'
import { actions } from 'react-redux-form'

const MODEL = 'rep'

const modelTransform = ({
  rep: {
    email,
    firstName,
    forwardingNumberAttributes: { number },
  },
}) => {
  const model = {
    rep: {
      email,
      firstName,
    },
  }
  if (number !== '') {
    model.rep.forwardingNumberAttributes = { number }
  }
  return model
}

export default compose(
  connectForm({
    form: MODEL,
    action: 'createRep',
    modelTransform,
    after: dispatch => dispatch(actions.reset(MODEL)),
  }),
)
