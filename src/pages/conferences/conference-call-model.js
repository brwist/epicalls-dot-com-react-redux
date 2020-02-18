import React from 'react'
import PropTypes from 'prop-types'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import VectorIcon from 'vector-icon'

const ConferenceCallModal = ({
  open,
  onRequestClose,
  connection,
  children,
}) => (
  <InfoBox
    open={open}
    onRequestClose={onRequestClose}
    actions={[
      <DialogBoxButton
        key="disconnect"
        label="disconnect"
        onClick={onRequestClose}
      />,
      <DialogBoxButton
        icon={
          connection && connection.isMuted() ? <VectorIcon name="mute" /> : null
        }
        key="mute"
        label={connection && connection.isMuted() ? 'Muted' : 'Mute'}
        onClick={() => connection && connection.mute(!connection.isMuted())}
      />,
    ]}
  >
    <h2>Conference</h2>
    {children}
  </InfoBox>
)

ConferenceCallModal.propTypes = {
  children: PropTypes.any,
  connection: PropTypes.any,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default ConferenceCallModal
