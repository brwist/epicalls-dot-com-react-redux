import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import VectorIcon from 'vector-icon'
import InputText from 'components/input-text'
import { Form } from 'react-redux-form'
import styled from 'styled-components'
import moment from 'moment'
import cx from 'classnames'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

const { AWS_S3_BUCKET } = process.env

const CallInfoModal = ({
  callInfoModalOpen,
  callInfo,
  toggleCallInfoModal,
  callTo,
}) => {
  const recording =
    (callInfo.recordings &&
      callInfo.recordings.length > 0 &&
      callInfo.recordings[0]) ||
    (callInfo.conference &&
      callInfo.conference.conferenceRecordings &&
      callInfo.conference.conferenceRecordings.length > 0 &&
      callInfo.conference.conferenceRecordings[0])
  function playPause() {
    const recElement = document.getElementById(`play-${recording.sid}`)
    recElement.paused ? recElement.play() : recElement.pause()
    return false
  }
  const { contact = {} } = callInfo
  return (
    <Dialog
      className={cx({
        'call-info-modal': true,
        'five-px-modal-border-radius': true,
        'call-info-rep-logs': !!callTo,
        'call-info-manager-logs': !callTo,
      })}
      open={callInfoModalOpen}
      onRequestClose={toggleCallInfoModal}
      bodyStyle={{
        padding: '0',
        borderRadius: '5px',
      }}
      overlayStyle={{
        opacity: 0,
      }}
      contentClassName="call-info-modal-content"
    >
      <GradientLine />
      <div className="hide-on-mobile" style={{ padding: '0 8px' }}>
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              {callTo && (
                <TableRowColumn
                  style={{ width: 46, paddingLeft: 6, paddingRight: 0 }}
                >
                  <VectorIcon
                    className="handset-on-green"
                    name="handsetOnGreen"
                    onClick={callTo(callInfo)}
                    style={{ display: 'inline-block' }}
                  />
                </TableRowColumn>
              )}
              <TableRowColumn style={{ paddingLeft: callTo ? 8 : 24 }}>
                {callInfo.incoming
                  ? callInfo.number
                  : callInfo.userName ||
                    (callInfo.localNumber && callInfo.localNumber.number)}
              </TableRowColumn>
              <TableRowColumn>
                {callInfo.incoming
                  ? callInfo.answerNumber || callInfo.userName
                  : callInfo.number}
              </TableRowColumn>
              <TableRowColumn>
                {new Date(callInfo.createdAt).toLocaleString()}
              </TableRowColumn>
              <TableRowColumn>
                {moment.duration(callInfo.duration * 1000).humanize()}
              </TableRowColumn>
              <TableRowColumn>
                {callInfo.incoming ? 'Incoming' : 'Outgoing Dial'}
              </TableRowColumn>
              <TableRowColumn style={{ textAlign: 'center' }}>
                <a href="javascript:void(0)" onClick={toggleCallInfoModal}>
                  <VectorIcon name="close" />
                </a>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="call-info-modal-body">
        <div
          className="hide-on-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: '1rem',
          }}
        >
          {callTo && (
            <div style={{ width: 46, paddingLeft: 6, paddingRight: 0 }}>
              <VectorIcon
                className="handset-on-green"
                name="handsetOnGreen"
                onClick={callTo(callInfo)}
                style={{ display: 'inline-block' }}
              />
            </div>
          )}
          <div style={{ fontWeight: 300, fontSize: 23 }}>
            {contact.name || callInfo.number}
          </div>
        </div>
        <CallInfo>
          <div className="hide-on-mobile" style={{ minWidth: 280 }}>
            <div style={{ fontWeight: 300, fontSize: 33 }}>
              {contact.name || callInfo.number}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <VectorIcon name="pin" />
              <span style={{ margin: '0 11px', whiteSpace: 'nowrap' }}>
                {contact.country}, {contact.geoName}
              </span>
              <GrayCall name="call" />
              <span
                style={{ margin: '0 11px', fontSize: '18px', fontWeight: 300 }}
              >
                {callInfo.number}
              </span>
            </div>
          </div>
          <div className="hide-on-mobile" style={{ textAlign: 'center' }}>
            <VectorIcon name="voiceWave" />
          </div>
          {recording && (
            <div style={{ width: 150, minWidth: 150 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <audio
                  id={`play-${recording.sid}`}
                  src={`https://s3.amazonaws.com/${AWS_S3_BUCKET}/${recording.sid}.mp3`}
                >
                  Your browser does not support the <code>audio</code> element.
                </audio>
                <a href="javascript:void(0)" onClick={playPause}>
                  <VectorIcon name="playO" />
                </a>
                <div style={{ marginLeft: '9px' }}>Play Recording</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '16.59px', textAlign: 'center' }}>
                  <a
                    download={recording.name}
                    href={`https://s3.amazonaws.com/${AWS_S3_BUCKET}/${recording.sid}.mp3`}
                  >
                    <VectorIcon name="download" />
                  </a>
                </div>
                <div style={{ marginLeft: '9px' }}>Download Recording</div>
              </div>
            </div>
          )}
        </CallInfo>
        {recording &&
          recording.transcriptions &&
          recording.transcriptions.map(transcription => (
            <div key={transcription.id}>
              <div>
                {transcription.addOnName ||
                  transcription.sourceName ||
                  'Transcription'}
                :
              </div>
              <p>{transcription.body}</p>
            </div>
          ))}
        <Form model="call">
          <InputText
            defaultValue={callInfo.notes || ''}
            floatingLabelFixed
            floatingLabelText="Note"
            fullWidth
            inputStyle={{ fontWeight: 300, fontSize: 13 }}
            model=".notes"
            multiLine
            rows={4}
          />
        </Form>
      </div>
    </Dialog>
  )
}

const CallInfo = styled.div`
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  color: #555759;
  margin-bottom: 2rem;
  > div {
    line-height: 34px;
  }
`

const GradientLine = styled.div`
  width: 100%;
  height: 5px;
  background-image: linear-gradient(225deg, #56c2cd, #83a4d5);
`

const GrayCall = styled(VectorIcon)`
  width: 11px;
  height: 11px;
  path {
    fill: #cecece;
  }
`

CallInfoModal.propTypes = {
  callInfo: PropTypes.object.isRequired,
  callInfoModalOpen: PropTypes.bool.isRequired,
  callTo: PropTypes.func,
  toggleCallInfoModal: PropTypes.func.isRequired,
}

export default CallInfoModal
