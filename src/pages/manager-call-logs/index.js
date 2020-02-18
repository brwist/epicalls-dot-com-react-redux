import React from 'react'
import PropTypes from 'prop-types'
import CallInfoModal from 'components/call-info-modal'
import moment from 'moment'
import SubMenu from 'components/sub-menu'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import SearchForm from 'components/search-form'
import smartify from './smartify'

const iconInfo = require('assets/images/icon-info.png')

const CallLogs = ({
  currentUser,
  callInfoModalOpen,
  toggleCallInfoModal,
  callInfo,
  setCallInfo,
  callTo,
  calls,
  match,
}) => (
  <div>
    <div className="header-and-action hide-on-desktop">
      <h2>Call Logs</h2>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SubMenu
        path={match.path}
        role={currentUser.role}
        unreadMessagesCount={currentUser.unreadMessagesCount}
      />
      <SearchForm model="searchManagerCallLogs" />
    </div>
    <div>
      <div>
        <div className="hide-on-desktop">
          <Table>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {calls.map(entity => (
                <TableRow
                  key={entity.id}
                  onClick={() => {
                    setCallInfo(entity)
                    toggleCallInfoModal()
                  }}
                  displayBorder={false}
                >
                  <TableRowColumn>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <dl className="mobile-table-dl" style={{ flexGrow: 1 }}>
                        <div>
                          <dt>From</dt>
                          <dd>
                            {entity.incoming ? entity.number : entity.rep.name}
                          </dd>
                        </div>
                        <div>
                          <dt>To</dt>
                          <dd>
                            {entity.incoming ? entity.rep.name : entity.number}
                          </dd>
                        </div>
                        <div>
                          <dt>Start Time</dt>
                          <dd>{new Date(entity.createdAt).toLocaleString()}</dd>
                        </div>
                        <div>
                          <dt>Duration, s</dt>
                          <dd>
                            {moment.duration(entity.duration * 1000).humanize()}
                          </dd>
                        </div>
                        <div>
                          <dt>Direction</dt>
                          <dd>
                            {entity.incoming ? 'Incoming' : 'Outgoing Dial'}
                          </dd>
                        </div>
                      </dl>
                      <div style={{ width: 30, textAlign: 'right' }}>
                        <img src={iconInfo} />
                      </div>
                    </div>
                  </TableRowColumn>
                </TableRow>
              ))}
              {calls.length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    You have no calls to display.
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="shadow hide-on-mobile">
          <Table
            bodyStyle={{ minWidth: 870 }}
            className="manager-call-logs-table"
            fixedHeader
            height="calc(100vh - 229px)"
            wrapperStyle={{ minWidth: 870 }}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>From</TableHeaderColumn>
                <TableHeaderColumn>To</TableHeaderColumn>
                <TableHeaderColumn>Start Time</TableHeaderColumn>
                <TableHeaderColumn>Duration, s</TableHeaderColumn>
                <TableHeaderColumn>Direction</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {calls.map(entity => (
                <TableRow
                  key={entity.id}
                  onClick={() => {
                    setCallInfo(entity)
                    toggleCallInfoModal()
                  }}
                  displayBorder={false}
                >
                  <TableRowColumn>
                    {entity.incoming ? entity.number : entity.userName}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.incoming ? entity.userName : entity.number}
                  </TableRowColumn>
                  <TableRowColumn>
                    {new Date(entity.createdAt).toLocaleString()}
                  </TableRowColumn>
                  <TableRowColumn>
                    {moment.duration(entity.duration * 1000).humanize()}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.incoming ? 'Incoming' : 'Outgoing Dial'}
                  </TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    <img src={iconInfo} />
                  </TableRowColumn>
                </TableRow>
              ))}
              {calls.length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    You have no calls to display.
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <CallInfoModal
          {...{ callInfoModalOpen, toggleCallInfoModal, callInfo }}
        />
      </div>
    </div>
  </div>
)

CallLogs.propTypes = {
  callInfo: PropTypes.object.isRequired,
  callInfoModalOpen: PropTypes.bool.isRequired,
  callTo: PropTypes.func.isRequired,
  calls: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setCallInfo: PropTypes.func.isRequired,
  toggleCallInfoModal: PropTypes.func.isRequired,
}

export default smartify(CallLogs)
