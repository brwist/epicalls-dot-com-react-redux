import { compose } from 'redux'
import { withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { createStructuredSelector } from 'reselect'
import { calls as callsSelector, searchQuery } from 'selectors'
import api from 'api'
import standardErrorHandling from 'utils/standard-error-handling'

const query = searchQuery('searchCallLogs')
const userCalls = state => state.currentUser.upcomingCalls

const calls = callsSelector(query, userCalls)

const selector = createStructuredSelector({
  calls,
  callTo: state => state.callTo,
})

const mapDispatchToProps = (dispatch, props) => ({
  makeACallTo: contact => e => {
    e.stopPropagation()
    const request = dispatch(api.actions.callTo.get(contact.number)).catch(
      standardErrorHandling,
    )
    dispatch(actions.submit('call', request, { fields: true }))
  },
  removeCall: () =>
    dispatch(api.actions.removeUpcomingCall(props.callToRemove.id)).then(_ =>
      props.setCallToRemove(null),
    ),
})

export default compose(
  withState('newCallModalOpen', 'setNewCallModalState', false),
  withState('callToRemove', 'setCallToRemove', null),
  withHandlers({
    toggleCallInfoModal: ({ openCallInfoModal }) => e =>
      openCallInfoModal(current => !current),
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
)
