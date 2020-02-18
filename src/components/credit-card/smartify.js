import { withStateHandlers } from 'recompose'
import { compose } from 'redux'

export default compose(
  withStateHandlers(
    ({ initalModalOpen = false }) => ({ modalOpen: initalModalOpen }),
    {
      setModalOpen: () => val => ({ modalOpen: val }),
      openModal: () => () => ({ modalOpen: true }),
      closeModal: () => () => ({ modalOpen: false }),
    },
  ),
)
