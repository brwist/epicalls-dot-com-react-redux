import { compose } from 'redux'
import { withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import api from 'api'

const mapDispatchToProps = (dispatch, props) => ({
  removeNumber: id => () =>
    dispatch(api.actions.removeRepLocalNumber(id)).then(data =>
      props.toggleRemoveNumberModal(),
    ),
  updateLocalNumber: localNumber => () =>
    dispatch(
      api.actions.updateLocalNumber(localNumber.id, {
        localNumber: { shared: !localNumber.shared },
      }),
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
    null,
    mapDispatchToProps,
  ),
)
