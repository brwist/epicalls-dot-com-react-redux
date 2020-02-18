import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { compose, withState, withHandlers, lifecycle } from 'recompose'

const Title = ({ contact, onAir, callTimer }) => (
  <div className="call-modal-title">
    <div className="client-number">
      Client{' '}
      <span className="number" style={{ display: 'inline-block' }}>
        {contact.name || contact.number}
      </span>
    </div>
    <div className="call-timer">
      <div>Ongoing Call:</div>
      <div className="timer">
        {onAir ? moment.utc(callTimer).format('HH:mm:ss') : '00:00:00'}
      </div>
    </div>
  </div>
)

Title.propTypes = {
  contact: PropTypes.object,
  onAir: PropTypes.bool.isRequired,
  callTimer: PropTypes.number.isRequired,
}

export default compose(
  withState('callTimer', 'setCallTimer', 0),
  withState('timerIntervalID', 'setTimerIntervalID', null),
  withHandlers({
    resetCallTimer: ({ setCallTimer }) => () => setCallTimer(0),
    incrementCallTimer: ({ setCallTimer, callTimer }) => () =>
      setCallTimer(callTimer + 1000),
  }),
  lifecycle({
    componentDidMount() {
      const timerIntervalID = setInterval(this.props.incrementCallTimer, 1000)
      this.props.setTimerIntervalID(timerIntervalID)
    },
    componentWillUnmount() {
      clearInterval(this.props.timerIntervalID)
    },
    componentWillReceiveProps(nextProps) {
      const { onAir } = nextProps
      if (onAir !== this.props.onAir) {
        this.props.resetCallTimer()
      }
    },
  }),
)(Title)
