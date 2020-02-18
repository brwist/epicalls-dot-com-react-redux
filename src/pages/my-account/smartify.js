import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import api from 'api'

const mapDispatchToProps = dispatch => ({
  setAcceptAllIncomingCalls: acceptAllIncomingCalls => () =>
    dispatch(api.actions.updateCurrentUser({ acceptAllIncomingCalls })),
  setAcceptIncomingBrowserCalls: acceptIncomingBrowserCalls => () =>
    dispatch(api.actions.updateCurrentUser({ acceptIncomingBrowserCalls })),
})

const selector = createStructuredSelector({
  token: state => state.token,
})

export default connect(
  selector,
  mapDispatchToProps,
)
