import React from 'react'
import PropTypes from 'prop-types'
import VectorIcon from 'vector-icon'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import SubMenu from 'components/sub-menu'
import ConferenceCallModal from './conference-call-model'
import smartify from './smartify'

const Conferences = ({
  currentUser,
  match,
  joinConference,
  conferenceCallModalOpen,
  setConferenceCallModalOpen,
  hangUp,
  callTimer,
  connection,
}) => (
  <div>
    <SubMenu
      path={match.path}
      role={currentUser.role}
      unreadMessagesCount={currentUser.unreadMessagesCount}
    />
    <div className="shadow">
      <Table
        bodyStyle={{ minWidth: 870 }}
        className="conferences-table"
        fixedHeader
        height="calc(100vh - 229px)"
        wrapperStyle={{ minWidth: 870 }}
      >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn
              style={{ width: 46, paddingLeft: 6, paddingRight: 0 }}
            />
            <TableHeaderColumn style={{ paddingLeft: 8 }}>
              Rep Name
            </TableHeaderColumn>
            <TableHeaderColumn>Region</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Duration</TableHeaderColumn>
            <TableHeaderColumn>Created</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {currentUser.conferences.map(entity => (
            <TableRow displayBorder={false} key={entity.id}>
              <TableRowColumn
                style={{ width: 46, paddingLeft: 6, paddingRight: 0 }}
                onClick={e => e.stopPropagation()}
              >
                {entity.status &&
                  entity.status !== 'conference-end' && (
                    <VectorIcon
                      className="handset-on-green"
                      name="handsetOnGreen"
                      onClick={joinConference(entity)}
                    />
                  )}
              </TableRowColumn>
              <TableRowColumn style={{ paddingLeft: 8 }}>
                {currentUser.salesReps.find(r => r.id === entity.repId).name}
              </TableRowColumn>
              <TableRowColumn>{entity.region}</TableRowColumn>
              <TableRowColumn>
                {entity.status && entity.status !== 'conference-end' ? (
                  <span style={{ color: 'green' }}>in progress</span>
                ) : (
                  entity.status
                )}
              </TableRowColumn>
              <TableRowColumn>
                {moment.duration((entity.duration || 0) * 1000).humanize()}
              </TableRowColumn>
              <TableRowColumn>
                {new Date(entity.createdAt).toLocaleString()}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {connection && (
        <ConferenceCallModal
          open={conferenceCallModalOpen}
          onRequestClose={hangUp}
          connection={connection}
        >
          {moment.utc(callTimer).format('HH:mm:ss')}
        </ConferenceCallModal>
      )}
    </div>
  </div>
)

Conferences.propTypes = {
  callTimer: PropTypes.number.isRequired,
  conferenceCallModalOpen: PropTypes.bool.isRequired,
  connection: PropTypes.any,
  currentUser: PropTypes.object,
  hangUp: PropTypes.func.isRequired,
  joinConference: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  setConferenceCallModalOpen: PropTypes.func.isRequired,
}

export default smartify(Conferences)
