import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import VectorIcon from 'vector-icon'
import styled from 'styled-components'
import NumPadIcon from 'material-ui/svg-icons/navigation/apps'
import { Link } from 'react-router-dom'
import MessagesIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'

const buttonStyle = {
  height: 71,
  fontWeight: 400,
  fontSize: 13,
}

const WhiteCall = styled(VectorIcon)`
  path {
    fill: #fff;
  }
`

const HangUpButton = ({ handleHangUp }) => (
  <FlatButton
    key="handUp"
    label="Hang Up"
    onClick={handleHangUp}
    style={{
      ...buttonStyle,
      color: '#fff',
      width: '35%',
    }}
    backgroundColor="#e4583e"
    hoverColor="#bc4934"
    icon={<VectorIcon name="hangUp" />}
  />
)

HangUpButton.propTypes = {
  handleHangUp: PropTypes.func.isRequired,
}

const MuteButton = ({ isMuted, toggleMute }) => (
  <FlatButton
    key="mute"
    label={isMuted ? 'Muted' : 'Mute'}
    onClick={toggleMute}
    style={{
      ...buttonStyle,
      width: '15%',
    }}
    backgroundColor="#f4f4f4"
    hoverColor="#eaeaea"
    icon={isMuted ? <VectorIcon name="mute" /> : null}
  />
)

MuteButton.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  toggleMute: PropTypes.func.isRequired,
}

const NumpadButton = ({ toggleDialPadOpen }) => (
  <FlatButton
    backgroundColor="#f4f4f4"
    hoverColor="#eaeaea"
    icon={<NumPadIcon />}
    key="numpad"
    onClick={toggleDialPadOpen}
    style={{
      ...buttonStyle,
      width: '15%',
      borderLeft: '1px solid #cecece',
    }}
  />
)

NumpadButton.propTypes = {
  toggleDialPadOpen: PropTypes.func.isRequired,
}

const MessagesButton = ({ contactId }) => (
  <FlatButton
    backgroundColor="#f4f4f4"
    containerElement={<Link to={`/messages?contactId=${contactId}`} />}
    hoverColor="#eaeaea"
    icon={<MessagesIcon />}
    key="messages"
    style={{
      ...buttonStyle,
      width: '15%',
      borderLeft: '1px solid #cecece',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  />
)

MessagesButton.propTypes = {
  contactId: PropTypes.number,
}

const AcceptCallButton = ({ handleAccept, onAir }) => (
  <FlatButton
    key="accept"
    label="Accept"
    onClick={handleAccept}
    style={{
      ...buttonStyle,
      color: '#fff',
      width: '35%',
    }}
    backgroundColor="#76CD1A"
    hoverColor="#43A047"
    icon={<WhiteCall name="call" />}
    disabled={onAir}
  />
)

AcceptCallButton.propTypes = {
  handleAccept: PropTypes.func.isRequired,
  onAir: PropTypes.bool.isRequired,
}

const CallActions = ({
  handleAccept,
  handleHangUp,
  toggleDialPadOpen,
  isMuted,
  toggleMute,
  contact,
  onAir,
}) => [
  <HangUpButton key="hangUp" handleHangUp={handleHangUp} />,
  <MuteButton key="mute" isMuted={isMuted} toggleMute={toggleMute} />,
  <NumpadButton key="numpad" toggleDialPadOpen={toggleDialPadOpen} />,
  <MessagesButton key="messages" contactId={contact.id} />,
  <AcceptCallButton key="accept" handleAccept={handleAccept} onAir={onAir} />,
]

CallActions.propTypes = {
  ...HangUpButton.propTypes,
  ...MuteButton.propTypes,
  ...NumpadButton.propTypes,
  ...MessagesButton.propTypes,
  ...AcceptCallButton.propTypes,
}

export default CallActions
