import { compose } from 'redux'
import { connect } from 'react-redux'
import { withState, lifecycle, withHandlers } from 'recompose'
import withJob from 'utils/with-job'
import api from 'api'

const mapDispatchToProps = (dispatch, props) => ({
  joinConference: conference => e => {
    dispatch(api.actions.joinConference(conference)).then(params => {
      const { token, id, localNumber } = params
      window.Twilio.Device.setup(token)
      window.Twilio.Device.ready(device => {
        device.connect({
          JoinConference: true,
          ConferenceId: conference.id,
          UserId: id,
          From: localNumber,
        })
      })
      window.Twilio.Device.connect(conn => {
        conn.mute(true) // join muted by default
        props.setConnection(conn)
        props.resetCallTimer()
        props.setConferenceCallModalOpen(true)
      })
      window.Twilio.Device.disconnect(conn => {
        props.setConnection(null)
        props.setConferenceCallModalOpen(false)
      })
    })
  },
  hangUp: () => {
    window.Twilio.Device.disconnectAll()
    props.setConferenceCallModalOpen(false) // hide modal
  },
  load: () => {
    dispatch(api.actions.conferences.get())
  },
})

const work = props => props.load()

export default compose(
  withState('callTimer', 'setCallTimer', 0),
  withState('connection', 'setConnection', null),
  withState('timerIntervalID', 'setTimerIntervalID', null),
  withHandlers({
    resetCallTimer: ({ setCallTimer }) => () => setCallTimer(0),
    incrementCallTimer: ({ setCallTimer, callTimer }) => () =>
      setCallTimer(callTimer + 1000),
  }),
  withState('conferenceCallModalOpen', 'setConferenceCallModalOpen', false),
  connect(
    null,
    mapDispatchToProps,
  ),
  withJob({ work }),
  lifecycle({
    componentDidMount() {
      const timerIntervalID = setInterval(this.props.incrementCallTimer, 1000)
      this.props.setTimerIntervalID(timerIntervalID)
    },
    componentWillUnmount() {
      clearInterval(this.props.timerIntervalID)
    },
  }),
)
