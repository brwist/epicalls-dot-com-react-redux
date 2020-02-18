import React from 'react'
import PropTypes from 'prop-types'
import AddAnAdmin from 'widgets/add-an-admin'
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
import AddButton from 'components/add-button'
import { Link } from 'react-router-dom'
import smartify from './smartify'

const Admins = ({ currentUser, admins, match }) => (
  <div className="main-dashboard">
    <div className="header-and-action hide-on-desktop">
      <h2>Admins</h2>
      <AddButton containerElement={<Link to="/add-admin" />} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SubMenu
        path={match.path}
        role={currentUser.role}
        unreadMessagesCount={currentUser.unreadMessagesCount}
      />
      <SearchForm model="searchAdmins" />
    </div>
    <div />
    <div className="hide-on-desktop">
      <Table>
        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {admins.map(entity => (
            <TableRow displayBorder={false} key={entity.id} selectable={false}>
              <TableRowColumn>
                <dl className="mobile-table-dl">
                  <div>
                    <dt>Name</dt>
                    <dd>{entity.name}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>{entity.email}</dd>
                  </div>
                </dl>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div>
      <div className="shadow hide-on-mobile">
        <Table
          bodyStyle={{ minWidth: 870 }}
          className="admins-table"
          fixedHeader
          height="calc(100vh - 229px)"
          wrapperStyle={{ minWidth: 870 }}
        >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {admins.map(entity => (
              <TableRow
                displayBorder={false}
                key={entity.id}
                selectable={false}
              >
                <TableRowColumn>{entity.name}</TableRowColumn>
                <TableRowColumn>{entity.email}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    <div className="hide-on-mobile">
      <AddAnAdmin />
    </div>
  </div>
)

Admins.propTypes = {
  admins: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default smartify(Admins)
