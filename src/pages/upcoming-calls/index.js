import React from 'react'
import PropTypes from 'prop-types'
import SearchForm from 'components/search-form'
import SubMenu from 'components/sub-menu'
import VectorIcon from 'vector-icon'
import AlertBox from 'components/alert-box'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table'
import AddNewCall from './add-new-call'
import smartify from './smartify'
import AddNewCallButton from './add-new-call-button'

const UpcomingCalls = ({
  currentUser,
  match,
  callTo,
  makeACallTo,
  newCallModalOpen,
  setNewCallModalState,
  callToRemove,
  setCallToRemove,
  removeCall,
}) => {
  function numberOrName(entity) {
    if (entity.contact) return entity.contact.name
    return entity.number
  }
  return (
    <div>
      <div className="header-and-action hide-on-desktop">
        <h2>Upcoming Calls</h2>
        <AddNewCallButton onClick={() => setNewCallModalState(true)} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SubMenu
          path={match.path}
          role={currentUser.role}
          unreadMessagesCount={currentUser.unreadMessagesCount}
        />
        <SearchForm model="searchUpcomingCalls" />
      </div>
      <div />
      <div>
        <div className="hide-on-desktop">
          <Table>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {currentUser.upcomingCalls.map(entity => (
                <TableRow displayBorder={false} key={entity.id}>
                  <TableRowColumn>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <dl className="mobile-table-dl" style={{ flexGrow: 1 }}>
                        <div>
                          <dt>Contact</dt>
                          <dd>{numberOrName(entity)}</dd>
                        </div>
                        <div>
                          <dt>Last contacted</dt>
                          <dd>
                            {entity.lastContactedAt &&
                              new Date(entity.lastContactedAt).toLocaleString()}
                          </dd>
                        </div>
                        <div>
                          <dt>Scheduled at</dt>
                          <dd>
                            {new Date(entity.scheduledAt).toLocaleString()}
                          </dd>
                        </div>
                        <div>
                          <dt>Source</dt>
                          <dd>{entity.source}</dd>
                        </div>
                        <div>
                          <dt>Reason</dt>
                          <dd>{entity.reason}</dd>
                        </div>
                      </dl>
                      <div style={{ width: 30, textAlign: 'center' }}>
                        <VectorIcon
                          name="trash"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setCallToRemove(entity)}
                        />
                      </div>
                    </div>
                  </TableRowColumn>
                </TableRow>
              ))}
              {currentUser.upcomingCalls.length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    You have no scheduled calls.
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
            fixedFooter
            fixedHeader
            height="calc(100vh - 280px)"
            wrapperStyle={{ minWidth: 870 }}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn
                  style={{ width: 46, paddingLeft: 6, paddingRight: 0 }}
                />
                <TableHeaderColumn style={{ paddingLeft: 8 }}>
                  Contact
                </TableHeaderColumn>
                <TableHeaderColumn>Last contacted</TableHeaderColumn>
                <TableHeaderColumn>Scheduled at</TableHeaderColumn>
                <TableHeaderColumn>Source</TableHeaderColumn>
                <TableHeaderColumn>Reason</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {currentUser.upcomingCalls.map(entity => (
                <TableRow displayBorder={false} key={entity.id}>
                  <TableRowColumn
                    style={{ width: 46, paddingLeft: 6, paddingRight: 0 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <VectorIcon
                      className="handset-on-green"
                      name="handsetOnGreen"
                      onClick={makeACallTo(entity)}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={{ paddingLeft: 8 }}>
                    {numberOrName(entity)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.lastContactedAt &&
                      new Date(entity.lastContactedAt).toLocaleString()}
                  </TableRowColumn>
                  <TableRowColumn>
                    {new Date(entity.scheduledAt).toLocaleString()}
                  </TableRowColumn>
                  <TableRowColumn>{entity.source}</TableRowColumn>
                  <TableRowColumn>{entity.reason}</TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    <VectorIcon
                      name="trash"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setCallToRemove(entity)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
              {currentUser.upcomingCalls.length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    You have no scheduled calls.
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
            <TableFooter adjustForCheckbox={false}>
              <TableRow>
                <TableRowColumn colSpan={5} style={{ textAlign: 'center' }}>
                  <AddNewCallButton
                    onClick={() => setNewCallModalState(true)}
                  />
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
          <AddNewCall
            open={newCallModalOpen}
            onRequestClose={() => setNewCallModalState(false)}
            contacts={currentUser.contacts}
            calls={currentUser.calls}
          />
          {callToRemove && (
            <AlertBox
              open={!!callToRemove}
              onRequestClose={() => setCallToRemove(null)}
              yesAction={removeCall}
            >
              Remove upcoming call to <b>{numberOrName(callToRemove)}</b> from
              the queue?
            </AlertBox>
          )}
        </div>
      </div>
    </div>
  )
}

UpcomingCalls.propTypes = {
  callTo: PropTypes.object,
  callToRemove: PropTypes.any,
  currentUser: PropTypes.object.isRequired,
  makeACallTo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  newCallModalOpen: PropTypes.bool.isRequired,
  removeCall: PropTypes.func.isRequired,
  setCallToRemove: PropTypes.func.isRequired,
  setNewCallModalState: PropTypes.func.isRequired,
}

export default smartify(UpcomingCalls)
