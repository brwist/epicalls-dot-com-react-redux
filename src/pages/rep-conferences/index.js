import React from 'react'
import PropTypes from 'prop-types'
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
import ConferenceInfoModal from 'components/conference-info-modal'
import smartify from './smartify'

const RepConferences = ({
  currentUser,
  conferences,
  match,
  conferenceInfo,
  setConferenceInfo,
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
            <TableHeaderColumn>Region</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Duration</TableHeaderColumn>
            <TableHeaderColumn>Created</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {conferences.map(entity => (
            <TableRow
              displayBorder={false}
              key={entity.id}
              onClick={() => setConferenceInfo(entity)}
            >
              <TableRowColumn>{entity.region}</TableRowColumn>
              <TableRowColumn>{entity.status}</TableRowColumn>
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
      {conferenceInfo && (
        <ConferenceInfoModal
          callInfo={conferenceInfo}
          callInfoModalOpen={!!conferenceInfo}
          toggleCallInfoModal={() => setConferenceInfo(null)}
        />
      )}
    </div>
  </div>
)

RepConferences.propTypes = {
  conferenceInfo: PropTypes.object,
  conferences: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  match: PropTypes.object.isRequired,
  setConferenceInfo: PropTypes.func.isRequired,
}

export default smartify(RepConferences)
