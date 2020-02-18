import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Title = ({ newCall, callStatus, callTimer }) => (
  <div className="call-modal-title">
    <div className="client-number">
      {newCall.contact ? newCall.contact.name : 'Client Number'}
      <span className="number" style={{ display: 'inline-block' }}>
        {newCall.to}
      </span>
    </div>
    <div className="call-timer">
      <div>Ongoing Call:</div>
      <div className="timer">
        {!callStatus && '00:00:00'}
        {callStatus && moment.utc(callTimer).format('HH:mm:ss')}
      </div>
    </div>
  </div>
)

Title.propTypes = {
  newCall: PropTypes.object,
  callStatus: PropTypes.bool.isRequired,
  callTimer: PropTypes.number.isRequired,
}

export default Title
