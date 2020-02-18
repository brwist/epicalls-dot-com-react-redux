import React from 'react'
import PropTypes from 'prop-types'
import CallInfoModal from 'components/call-info-modal'
import MakeACall from 'widgets/make-a-call'
import VectorIcon from 'vector-icon'
import { Link } from 'react-router-dom'
import moment from 'moment'
import SearchForm from 'components/search-form'
import SubMenu from 'components/sub-menu'
import IconButton from 'material-ui/IconButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton/FlatButton'
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
}) => {
  function numberOrName(entity) {
    if (entity.contact) return entity.contact.name || entity.contact.number
    return entity.number
  }
  return (
    <div className="main-dashboard">
      <div className="header-and-action hide-on-desktop">
        <h2>Call Logs</h2>
        <FlatButton
          containerElement={<Link to="/make-a-call" />}
          label="Make A Call"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SubMenu
          path={match.path}
          role={currentUser.role}
          unreadMessagesCount={currentUser.unreadMessagesCount}
        />
        <SearchForm model="searchCallLogs" />
      </div>
      <div />
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
                            {entity.incoming
                              ? numberOrName(entity)
                              : entity.localNumber
                                ? entity.localNumber.number
                                : null}
                          </dd>
                        </div>
                        <div>
                          <dt>To</dt>
                          <dd>
                            {entity.incoming
                              ? currentUser.number
                              : numberOrName(entity)}
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
                    Get started by making a phone call
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="shadow hide-on-mobile">
          <Table
            bodyStyle={{ minWidth: 870 }}
            className="call-logs-table"
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
                  From
                </TableHeaderColumn>
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
                  <TableRowColumn
                    style={{ width: 46, paddingLeft: 6, paddingRight: 0 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <VectorIcon
                      className="handset-on-green"
                      name="handsetOnGreen"
                      onClick={callTo(entity)}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={{ paddingLeft: 8 }}>
                    {entity.incoming
                      ? numberOrName(entity)
                      : entity.localNumber
                        ? entity.localNumber.number
                        : null}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.incoming
                      ? currentUser.number
                      : numberOrName(entity)}
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
                    <IconButton onClick={() => {
                      setCallInfo(entity)
                      toggleCallInfoModal()
                    }}>
                      <img src={iconInfo} alt="call info" />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
              {calls.length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    Get started by making a phone call
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <CallInfoModal
          {...{ callInfoModalOpen, toggleCallInfoModal, callInfo, callTo }}
        />
      </div>
      <div className="hide-on-mobile">
        {currentUser.forwardingNumber &&
        currentUser.forwardingNumber.confirmed ? (
          <MakeACall />
        ) : (
          <FlatButton
            containerElement={<Link to="/my-numbers" />}
            fullWidth
            label="Confirm Outbound Number"
            secondary
          />
        )}
      </div>
    </div>
  )
}

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
