import { compose } from 'redux'
import { connect } from 'react-redux'
import api from 'api'

const mapDispatchToProps = (dispatch, props) => ({
  detachSource: () => dispatch(api.actions.stripeDetachSource()),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)
