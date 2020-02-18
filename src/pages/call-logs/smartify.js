import { compose } from 'redux'
import { withState, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { createStructuredSelector } from 'reselect'
import { calls as callsSelector, searchQuery } from 'selectors'
import api from 'api'
import debounce from 'debounce'

const query = searchQuery('searchCallLogs')
const userCalls = state => state.repCalls.results

const calls = callsSelector(query, userCalls)

const totalPages = state => state.repCalls.totalPages

const selector = createStructuredSelector({
  calls,
  totalPages,
})

const mapDispatchToProps = (dispatch, props) => ({
  callTo: contact => e => {
    e.stopPropagation()
    dispatch(actions.change('call.number', contact.number))
    dispatch(actions.submit('call'))
  },
  loadCalls: (page, params = {}) =>
    dispatch(api.actions.repCalls.get({ page }, params)),
  handleScroll: e => {
    const tableRect = e.target.childNodes[0].getBoundingClientRect()
    const top = tableRect.top - 186
    const height = e.target.getBoundingClientRect().height
    const rest = tableRect.height + top - height // console.log(rest);
    const rowHeight = 50
    if (rest < rowHeight * 50) props.setNextCallsPage()
  },
})

export default compose(
  withState('callInfoModalOpen', 'openCallInfoModal', false),
  withState('callInfo', 'setCallInfo', {}),
  withState('callsPage', 'setCallsPage', 1),
  withHandlers({
    toggleCallInfoModal: ({ openCallInfoModal }) => e =>
      openCallInfoModal(current => !current),
    setNextCallsPage: ({ setCallsPage }) => {
      function fn() {
        setCallsPage(current => current + 1)
      }
      return debounce(fn, 100)
    },
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCalls(1, { merge: false, withoutReset: false })
      const elem = document.getElementsByClassName('call-logs-table')[1]
        .parentNode
      elem.addEventListener('scroll', this.props.handleScroll)
    },
    componentWillUnmount() {
      const elem = document.getElementsByClassName('call-logs-table')[1]
        .parentNode
      elem.removeEventListener('scroll', this.props.handleScroll)
    },
    componentWillReceiveProps(nextProps) {
      if (
        nextProps.callsPage > this.props.callsPage &&
        nextProps.callsPage <= nextProps.totalPages
      ) {
        this.props.loadCalls(nextProps.callsPage, { merge: true })
      }
    },
  }),
)
