import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'material-ui/Toggle'

const CallRuntimeSettings = ({
  recordCall,
  toggleRecordCall,
  callStatus,
  conferenceCall,
  toggleConferenceCall,
}) => (
  <div className="call-runtime-settings">
    <Toggle
      label="Record Call"
      labelPosition="right"
      toggled={recordCall}
      onToggle={toggleRecordCall}
      disabled={callStatus}
    />
    <div style={{ height: 1, marginBottom: '.5rem' }} />
    <Toggle
      label="Conference Call"
      labelPosition="right"
      toggled={conferenceCall}
      onToggle={toggleConferenceCall}
      disabled={callStatus}
    />
  </div>
)

CallRuntimeSettings.propTypes = {
  recordCall: PropTypes.bool.isRequired,
  toggleRecordCall: PropTypes.func.isRequired,
  toggleConferenceCall: PropTypes.func.isRequired,
  callStatus: PropTypes.bool.isRequired,
  conferenceCall: PropTypes.bool.isRequired,
}

export default CallRuntimeSettings
