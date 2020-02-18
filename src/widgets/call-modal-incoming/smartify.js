import { compose } from 'redux'
import { withState, withHandlers } from 'recompose'

export default compose(
  withState('contactInfo', 'setContactInfo', {}),
  withState('dialPadOpen', 'setDialPadOpen', false),
  withState('dialPadHistory', 'setDialPadHistory', ''),
  withHandlers({
    toggleDialPadOpen: ({ setDialPadOpen, setDialPadHistory }) => () => {
      setDialPadOpen(current => !current)
      setDialPadHistory('')
    },
    addDialPadHistory: ({
      dialPadHistory,
      setDialPadHistory,
      handleSendDigits,
    }) => num => {
      handleSendDigits(num)
      setDialPadHistory(dialPadHistory + num)
    },
  }),
)
