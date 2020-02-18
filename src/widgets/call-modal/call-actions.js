import React from 'react'
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

const CallActions = ({
  hangUp,
  connection,
  toggleDialPadOpen,
  localNumbers,
  newCall,
  makeACall,
  currentUserId,
  callFromNumber,
  recordCall,
  conferenceCall,
}) => [
  <FlatButton
    key="handUp"
    label="Hang Up"
    onClick={hangUp}
    style={{
      ...buttonStyle,
      color: '#fff',
      width: '35%',
    }}
    backgroundColor="#e4583e"
    hoverColor="#bc4934"
    icon={<VectorIcon name="hangUp" />}
  />,
  <FlatButton
    key="mute"
    label={connection && connection.isMuted() ? 'Muted' : 'Mute'}
    onClick={() => connection && connection.mute(!connection.isMuted())}
    style={{
      ...buttonStyle,
      width: '15%',
    }}
    backgroundColor="#f4f4f4"
    hoverColor="#eaeaea"
    icon={
      connection && connection.isMuted() ? <VectorIcon name="mute" /> : null
    }
  />,
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
  />,
  <FlatButton
    backgroundColor="#f4f4f4"
    containerElement={
      <Link
        to={`/messages?contactId=${
          newCall.contact ? newCall.contact.id : newCall.to
        }`}
      />
    }
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
  />,
  <FlatButton
    key="call"
    label="Call"
    onClick={makeACall(
      newCall.to,
      currentUserId,
      callFromNumber,
      recordCall,
      conferenceCall,
    )}
    style={{
      ...buttonStyle,
      color: '#fff',
      width: '35%',
    }}
    backgroundColor="#76CD1A"
    hoverColor="#43A047"
    icon={<WhiteCall name="call" />}
    disabled={!(localNumbers.length > 0)}
  />,
]

export default CallActions
