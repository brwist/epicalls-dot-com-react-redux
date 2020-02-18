import React from 'react'
import PropTypes from 'prop-types'
import DialPadBox from 'components/dial-pad-box'
import TextField from 'material-ui/TextField'
import cx from 'classnames'

const DialPad = ({ dialPadOpen, dialPadHistory, addDialPadHistory }) => (
  <div
    className={cx({
      'call-modal-dial-pad': true,
      hide: !dialPadOpen,
    })}
  >
    <TextField
      fullWidth
      id="dial-pad-input"
      inputStyle={{ textAlign: 'center' }}
      readOnly
      value={dialPadHistory}
    />
    <DialPadBox handleClick={addDialPadHistory} style={{ margin: '0 auto' }} />
  </div>
)

DialPad.propTypes = {
  dialPadOpen: PropTypes.bool.isRequired,
  addDialPadHistory: PropTypes.func.isRequired,
  dialPadHistory: PropTypes.string.isRequired,
}

export default DialPad
