import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import VectorIcon from 'vector-icon'
import styled from 'styled-components'
import moment from 'moment'
import cx from 'classnames'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

const ConferenceInfoModal = ({
  callInfoModalOpen,
  callInfo,
  toggleCallInfoModal,
  callTo,
}) => {
  const recording =
    callInfo.conferenceRecordings &&
    callInfo.conferenceRecordings.length > 0 &&
    callInfo.conferenceRecordings[0]
  function playPause() {
    const recElement = document.getElementById(`play-${recording.sid}`)
    recElement.paused ? recElement.play() : recElement.pause()
    return false
  }
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
              <TableRowColumn>{callInfo.region}</TableRowColumn>
              <TableRowColumn>{callInfo.status}</TableRowColumn>
              <TableRowColumn>
                {moment.duration((callInfo.duration || 0) * 1000).humanize()}
              </TableRowColumn>
              <TableRowColumn>
                {new Date(callInfo.createdAt).toLocaleString()}
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
        <CallInfo>
          <div className="hide-on-mobile" style={{ textAlign: 'center' }}>
            <VectorIcon name="voiceWave" />
          </div>
          {recording && (
            <div style={{ width: 150, minWidth: 150 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <audio id={`play-${recording.sid}`} src={recording.play}>
                  Your browser does not support the <code>audio</code> element.
                </audio>
                <a href="javascript:void(0)" onClick={playPause}>
                  <VectorIcon name="playO" />
                </a>
                <div style={{ marginLeft: '9px' }}>Play Recording</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '16.59px', textAlign: 'center' }}>
                  <a download={recording.name} href={recording.download}>
                    <VectorIcon name="download" />
                  </a>
                </div>
                <div style={{ marginLeft: '9px' }}>Download Recording</div>
              </div>
            </div>
          )}
        </CallInfo>
      </div>
    </Dialog>
  )
}

const CallInfo = styled.div`
  display: flex;
  font-size: 13px;
  justify-content: space-around;
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

ConferenceInfoModal.propTypes = {
  callInfo: PropTypes.object.isRequired,
  callInfoModalOpen: PropTypes.bool.isRequired,
  callTo: PropTypes.func,
  toggleCallInfoModal: PropTypes.func.isRequired,
}

export default ConferenceInfoModal
