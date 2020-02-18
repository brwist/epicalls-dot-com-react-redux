import React from 'react'
import PropTypes from 'prop-types'
import VectorIcon from 'vector-icon'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton'
import SubMenu from 'components/sub-menu'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table'
import smartify from './smartify'

const ManagerUsage = ({ currentUser, stats, year, month, match }) => {
  function navLink(direction = 'next') {
    const act = direction === 'next' ? 'add' : 'subtract'
    const dd = moment()
      .year(year)
      .month(month - 1)
      [act](1, 'month')
    return `/manager-usage/${dd.year()}/${dd.month() + 1}`
  }
  function humanizeSeconds(seconds) {
    if (typeof seconds === 'undefined') return ''
    if (seconds === 0) return 0
    return Math.ceil(seconds / 60)
  }
  function hasPrevStat() {
    const userCreatedAt = new Date(stats.createdAt)
    const currentMonth = moment()
      .year(year)
      .month(month - 1)
      .startOf('month')
      .toDate()
    return userCreatedAt < currentMonth
  }
  function hasNextStat() {
    const currentMonth = moment()
      .year(year)
      .month(month - 1)
      .endOf('month')
      .toDate()
    return new Date() > currentMonth
  }
  return (
    <div>
      <SubMenu
        path={match.path}
        role={currentUser.role}
        unreadMessagesCount={currentUser.unreadMessagesCount}
      />
      <div>
        <div className="hide-on-desktop">
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {hasPrevStat() && (
                      <FlatButton
                        containerElement={<Link to={navLink('prev')} />}
                        icon={<VectorIcon name="chevronLeft" />}
                        secondary
                      />
                    )}
                    {!hasPrevStat() && DummyButton}
                    <FlatButton
                      disabled
                      label={
                        <span>
                          {moment()
                            .year(year)
                            .month(month - 1)
                            .format('MMMM YYYY')}
                        </span>
                      }
                    />
                    {hasNextStat() && (
                      <FlatButton
                        containerElement={<Link to={navLink('next')} />}
                        icon={
                          <VectorIcon
                            name="chevronLeft"
                            style={{ transform: 'rotate(.5turn)' }}
                          />
                        }
                        secondary
                      />
                    )}
                    {!hasNextStat() && DummyButton}
                  </div>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows>
              {stats.salesReps.map(rep => (
                <TableRow displayBorder={false} key={rep.id} selectable={false}>
                  <TableRowColumn>
                    <dl className="mobile-table-dl stats">
                      <div>
                        <dt>Name</dt>
                        <dd>{rep.name}</dd>
                      </div>
                      <div>
                        <dt>Local Numbers</dt>
                        <dd>{rep.localNumbersCount}</dd>
                      </div>
                      <div>
                        <dt>Incoming, min/mon</dt>
                        <dd>{humanizeSeconds(rep.durationIncoming)}</dd>
                      </div>
                      <div>
                        <dt>Outgoing, min/mon</dt>
                        <dd>{humanizeSeconds(rep.durationOutbound)}</dd>
                      </div>
                      <div>
                        <dt>Recordings, min/mon</dt>
                        <dd>{humanizeSeconds(rep.recordingsDuration)}</dd>
                      </div>
                      <div>
                        <dt>Transcripts, min/mon</dt>
                        <dd>{humanizeSeconds(rep.transcriptionsDuration)}</dd>
                      </div>
                      <div>
                        <dt>Total memory of recordings</dt>
                        <dd>{rep.recordsSize}</dd>
                      </div>
                      <div>
                        <dt>Toll-Free Numbers</dt>
                        <dd>{rep.tollFreeNumbersCount}</dd>
                      </div>
                      <div>
                        <dt>Status</dt>
                        <dd>{rep.active ? 'Active' : 'Inactive'}</dd>
                      </div>
                    </dl>
                  </TableRowColumn>
                </TableRow>
              ))}
              {stats.salesReps.length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    You have no info to display.
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
            <TableFooter adjustForCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{ textAlign: 'center' }}>
                  <b>Total</b>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>
                  <dl className="mobile-table-dl stats">
                    <div>
                      <dt>Local Numbers</dt>
                      <dd>{stats.localNumbersCount}</dd>
                    </div>
                    <div>
                      <dt>Incoming, min</dt>
                      <dd>{humanizeSeconds(stats.durationIncoming)}</dd>
                    </div>
                    <div>
                      <dt>Outgoing, min</dt>
                      <dd>{humanizeSeconds(stats.durationOutbound)}</dd>
                    </div>
                    <div>
                      <dt>Recordings, min</dt>
                      <dd>{humanizeSeconds(stats.recordingsDuration)}</dd>
                    </div>
                    <div>
                      <dt>Transcripts, min</dt>
                      <dd>{humanizeSeconds(stats.transcriptionsDuration)}</dd>
                    </div>
                    <div>
                      <dt>Total memory of recordings</dt>
                      <dd>{stats.recordsSize}</dd>
                    </div>
                    <div>
                      <dt>Toll-Free Numbers</dt>
                      <dd>{stats.tollFreeNumbersCount || 0}</dd>
                    </div>
                  </dl>
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="shadow hide-on-mobile">
          <Table
            bodyStyle={{ minWidth: 870 }}
            className="manager-usage-table"
            fixedFooter
            fixedHeader
            height="calc(100vh - 325px)"
            wrapperStyle={{ minWidth: 870 }}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn colSpan={9}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {hasPrevStat() && (
                      <FlatButton
                        containerElement={<Link to={navLink('prev')} />}
                        icon={<VectorIcon name="chevronLeft" />}
                        secondary
                      />
                    )}
                    {!hasPrevStat() && DummyButton}
                    <FlatButton
                      disabled
                      label={
                        <span>
                          {moment()
                            .year(year)
                            .month(month - 1)
                            .format('MMMM YYYY')}
                        </span>
                      }
                    />
                    {hasNextStat() && (
                      <FlatButton
                        containerElement={<Link to={navLink('next')} />}
                        icon={
                          <VectorIcon
                            name="chevronLeft"
                            style={{ transform: 'rotate(.5turn)' }}
                          />
                        }
                        secondary
                      />
                    )}
                    {!hasNextStat() && DummyButton}
                  </div>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>
                  Local
                  <br />
                  Numbers
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Incoming
                  <br />
                  min/mon
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Outgoing
                  <br />
                  min/mon
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Recordings
                  <br />
                  min/mon
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Transcripts
                  <br />
                  min/mon
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Total memory
                  <br />
                  of recordings
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Toll-Free
                  <br />
                  Numbers
                </TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {stats.salesReps.map(rep => (
                <TableRow displayBorder={false} key={rep.id} selectable={false}>
                  <TableRowColumn>{rep.name}</TableRowColumn>
                  <TableRowColumn>{rep.localNumbersCount}</TableRowColumn>
                  <TableRowColumn>
                    {humanizeSeconds(rep.durationIncoming)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {humanizeSeconds(rep.durationOutbound)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {humanizeSeconds(rep.recordingsDuration)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {humanizeSeconds(rep.transcriptionsDuration)}
                  </TableRowColumn>
                  <TableRowColumn>{rep.recordsSize}</TableRowColumn>
                  <TableRowColumn>{rep.tollFreeNumbersCount}</TableRowColumn>
                  <TableRowColumn>
                    {rep.active ? 'Active' : 'Inactive'}
                  </TableRowColumn>
                </TableRow>
              ))}
              {stats.salesReps.length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    You have no info to display.
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
            <TableFooter adjustForCheckbox={false}>
              <TableRow>
                <TableRowColumn>
                  <b>Total</b>
                </TableRowColumn>
                <TableRowColumn>{stats.localNumbersCount}</TableRowColumn>
                <TableRowColumn>
                  {humanizeSeconds(stats.durationIncoming)}
                </TableRowColumn>
                <TableRowColumn>
                  {humanizeSeconds(stats.durationOutbound)}
                </TableRowColumn>
                <TableRowColumn>
                  {humanizeSeconds(stats.recordingsDuration)}
                </TableRowColumn>
                <TableRowColumn>
                  {humanizeSeconds(stats.transcriptionsDuration)}
                </TableRowColumn>
                <TableRowColumn>{stats.recordsSize}</TableRowColumn>
                <TableRowColumn>
                  {stats.tollFreeNumbersCount || 0}
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  )
}

const DummyButton = <FlatButton disabled label={<span>&mdash;</span>} />

ManagerUsage.propTypes = {
  currentUser: PropTypes.object,
  match: PropTypes.object.isRequired,
  month: PropTypes.number,
  stats: PropTypes.object.isRequired,
  year: PropTypes.number,
}

export default smartify(ManagerUsage)
