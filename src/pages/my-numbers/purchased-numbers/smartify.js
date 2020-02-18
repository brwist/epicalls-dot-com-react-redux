import { compose } from 'redux'
import { withState, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import api from 'api'
import { createStructuredSelector } from 'reselect'
import { allLocalNumbers } from 'selectors'

const selector = createStructuredSelector({
  allLocalNumbers,
})

const mapDispatchToProps = (dispatch, props) => ({
  load: () => dispatch(api.actions.localNumbers.get()),
  removeNumber: id => () =>
    dispatch(api.actions.removeLocalNumber(id)).then(data =>
      props.toggleRemoveNumberModal(),
    ),
})

export default compose(
  withState('removeNumberModalOpen', 'openRemoveNumberModal', false),
  withState('numberToRemove', 'setNumberToRemove', {}),
  withHandlers({
    toggleRemoveNumberModal: ({ openRemoveNumberModal }) => e =>
      openRemoveNumberModal(current => !current),
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.load()
    },
  }),
)
