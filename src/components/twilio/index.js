import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { twilioAccessToken } from 'selectors'
import { clearTwilioProcessLog, addTwilioProcessLog, hangUpCall } from 'actions'
import CallModal from 'widgets/call-modal'
import CallModalIncoming from 'widgets/call-modal-incoming'
import api from 'api'

const INCOMING = 'incoming'
const ESTABLISHED = 'established'
const DISCONNECTED = 'disconnected'

const selector = createStructuredSelector({
  twilioAccessToken,
})

const mapDispatchToProps = dispatch => ({
  load: () => dispatch(api.actions.twilioAccessToken.get()),
  clearLog: () => dispatch(clearTwilioProcessLog()),
  addLogMsg: msg => dispatch(addTwilioProcessLog(msg)),
  hangUpCall: () => dispatch(hangUpCall()),
  findContact: number => dispatch(api.actions.findContact({ number })),
})

class Twilio extends React.PureComponent {
  static propTypes = {
    load: PropTypes.func.isRequired,
    clearLog: PropTypes.func.isRequired,
    addLogMsg: PropTypes.func.isRequired,
    hangUpCall: PropTypes.func.isRequired,
    findContact: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.load = props.load
    this.clearLog = props.clearLog
    this.addLogMsg = props.addLogMsg
    this.hangUpCall = props.hangUpCall
  }

  state = {
    connection: null,
    callStatus: null,
    connectionStatus: null,
    isMuted: false,
    contact: {},
  }

  componentDidMount() {
    this.load().then(({ token }) => {
      if (token) this.setup(token)
    })
  }

  handleConnect = connection => {
    this.setState({
      connectionStatus: ESTABLISHED,
      isMuted: connection.isMuted(),
      connection,
    })
    this.clearLog()
    this.addLogMsg('Successfully established call!')
  }

  handleDisconnect = () => {
    this.setState({
      callStatus: DISCONNECTED,
      connectionStatus: DISCONNECTED,
      connection: null,
    })
    this.hangUpCall()
    this.addLogMsg('Call ended.')
  }

  handleReady = devise => {
    this.addLogMsg('Twilio.Device Ready!')
    devise.on('error', this.handleError)
    devise.on('connect', this.handleConnect)
    devise.on('disconnect', this.handleDisconnect)
    devise.on('incoming', this.onIncoming)
  }

  onIncoming = connection => {
    this.setState({
      connection,
      callStatus: INCOMING,
    })
    const { findContact } = this.props
    findContact(connection.parameters.From).then(contact =>
      this.setState({ contact }),
    )
  }

  handleHangUp = () => {
    const { connection } = this.state
    connection.disconnect()
  }

  handleReject = () => {
    const { connection } = this.state
    connection.reject()
    this.setState({
      callStatus: DISCONNECTED,
      connectionStatus: DISCONNECTED,
      connection: null,
    })
  }

  handleAccept = () => {
    const { connection } = this.state
    connection.accept()
  }

  handleSendDigits = digit => {
    const { connection } = this.state
    if (connection) connection.sendDigits(digit)
  }

  handleError = err => {
    this.addLogMsg(`Twilio.Device Error: ${err.message}`)
  }

  toggleMute = () => {
    const { isMuted, connection } = this.state
    connection.mute(!isMuted)
    this.setState({
      isMuted: !isMuted,
    })
  }

  sendDigits = num => {
    const { connection } = this.state
    connection.sendDigits(num)
  }

  setup = token => {
    window.Twilio.Device.setup(token)
    window.Twilio.Device.ready(this.handleReady)
  }

  render() {
    const {
      connection,
      callStatus,
      connectionStatus,
      contact,
      isMuted,
    } = this.state
    return (
      <div>
        <CallModal connection={connection} />
        <CallModalIncoming
          open={callStatus === INCOMING}
          handleAccept={this.handleAccept}
          handleHangUp={
            connectionStatus === ESTABLISHED
              ? this.handleHangUp
              : this.handleReject
          }
          isMuted={isMuted}
          toggleMute={this.toggleMute}
          contact={contact}
          onAir={connectionStatus === ESTABLISHED}
          handleSendDigits={this.handleSendDigits}
        />
      </div>
    )
  }
}

export default connect(
  selector,
  mapDispatchToProps,
)(Twilio)
