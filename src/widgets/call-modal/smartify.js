import { compose } from 'redux'
import { connect } from 'react-redux'
import { withState, withHandlers, lifecycle } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { hangUpCall, addTwilioProcessLog, clearTwilioProcessLog } from 'actions'
import api from 'api'

const selector = createStructuredSelector({
  currentUserId: state => state.currentUser.id,
  newCall: state => state.callTo,
  localNumbers: state => (state.callTo && state.callTo.localNumbers) || [],
  hasLocalNumber: state => {
    const { callTo } = state
    const { localNumbers = [] } = callTo || {}
    return (
      localNumbers.length > 0 && localNumbers.filter(n => n.local).length > 0
    )
  },
  localNumber: state => {
    const { callTo } = state
    const { localNumbers = [] } = callTo || {}
    return (
      localNumbers.length > 0 &&
      (localNumbers.find(n => n.local) || localNumbers[0]).number
    )
  },
})

const mapDispatchToProps = (dispatch, props) => ({
  makeACall: (
    number,
    currentUserId,
    callFromNumber,
    recordCall,
    conferenceCall,
  ) => () => {
    dispatch(clearTwilioProcessLog())
    if (!callFromNumber) return
    const callParams = {
      From: callFromNumber,
      To: number,
      Record: recordCall,
      Conference: conferenceCall,
      UserId: currentUserId,
    }
    window.Twilio.Device.connect(callParams)
  },
  hangUp: () => {
    dispatch(addTwilioProcessLog('Hanging up...'))
    window.Twilio.Device.disconnectAll()
    if (!props.callStatus) {
      dispatch(hangUpCall())
    }
  },
  purchaseNumber: (areaCode, country, clientNumber) => {
    dispatch(
      api.actions.availableLocalNumber({ localNumber: { areaCode, country } }),
    ).then(({ number }) =>
      dispatch(api.actions.addLocalNumber({ localNumber: { number } })).then(
        _ => dispatch(api.actions.callTo.get(clientNumber)),
      ),
    )
  },
})

export default compose(
  withState('callStatus', 'setCallStatus', false),
  withState('callTimer', 'setCallTimer', 0),
  withState('timerIntervalID', 'setTimerIntervalID', null),
  withState('dialPadOpen', 'setDialPadOpen', false),
  withState('dialPadHistory', 'setDialPadHistory', ''),
  withHandlers({
    resetCallTimer: ({ setCallTimer }) => () => setCallTimer(0),
    incrementCallTimer: ({ setCallTimer, callTimer }) => () =>
      setCallTimer(callTimer + 1000),
    toggleDialPadOpen: ({ setDialPadOpen, setDialPadHistory }) => () => {
      setDialPadOpen(current => !current)
      setDialPadHistory('')
    },
    addDialPadHistory: ({
      dialPadHistory,
      setDialPadHistory,
    }) => connection => num => {
      connection && connection.sendDigits(num)
      setDialPadHistory(dialPadHistory + num)
    },
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
  withState('recordCall', 'setRecordCall', true),
  withState(
    'callFromNumber',
    'setCallFromNumber',
    ({ localNumber }) => localNumber,
  ),
  withState('conferenceCall', 'setConferenceCall', false),
  withHandlers({
    toggleRecordCall: ({ setRecordCall }) => (e, isInputChecked) =>
      setRecordCall(isInputChecked),
    toggleConferenceCall: ({ setConferenceCall }) => (e, isInputChecked) =>
      setConferenceCall(isInputChecked),
    selectCallFromNumber: ({ setCallFromNumber }) => (e, key, payload) =>
      setCallFromNumber(payload),
  }),
  lifecycle({
    componentDidMount() {
      const timerIntervalID = setInterval(this.props.incrementCallTimer, 1000)
      this.props.setTimerIntervalID(timerIntervalID)
      this.props.setCallFromNumber(this.localNumber)
    },
    componentWillUnmount() {
      clearInterval(this.props.timerIntervalID)
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.localNumber !== this.props.localNumber) {
        nextProps.setCallFromNumber(nextProps.localNumber)
      }
      if (
        nextProps.localNumbers > 0 &&
        JSON.stringify(nextProps.localNumbers) !==
          JSON.stringify(this.props.localNumbers)
      ) {
        const localNumber =
          nextProps.localNumbers.find(n => n.local) || nextProps.localNumbers[0]
        nextProps.setCallFromNumber(localNumber.number)
      }
      if (nextProps.callStatus !== this.props.callStatus)
        this.props.resetCallTimer()
    },
  }),
)
