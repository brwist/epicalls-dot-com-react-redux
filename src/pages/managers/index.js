import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import VectorIcon from 'vector-icon'
import AddAManager from 'widgets/add-a-manager'
import Toggle from 'material-ui/Toggle'
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
import FlatButton from 'material-ui/FlatButton'
import smartify from './smartify'
import Subscriptions from './subscriptions'

function cardInfo({ expMonth, expYear }) {
  if (expMonth && expYear) {
    return `expires ${expMonth}/${expYear}`
  }
  return ''
}

const Managers = ({
  currentUser,
  updateManagerPricing,
  removeManagerPricing,
  currentManager,
  setCurrentManager,
  managers,
  loginAsManager,
  toggleManager,
  match,
  pricings,
}) => (
  <div className="main-dashboard">
    <div className="header-and-action hide-on-desktop">
      <h2>Managers</h2>
      <AddButton containerElement={<Link to="/add-manager" />} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SubMenu
        path={match.path}
        role={currentUser.role}
        unreadMessagesCount={currentUser.unreadMessagesCount}
      />
      <SearchForm model="searchManagers" />
    </div>
    <div />
    <div>
      <div className="hide-on-desktop">
        <Table>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {managers.map(entity => (
              <TableRow
                displayBorder={false}
                key={entity.id}
                onClick={() => loginAsManager(entity.id)}
              >
                <TableRowColumn>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <dl className="mobile-table-dl" style={{ width: '80%' }}>
                      <div>
                        <dt>Company Name</dt>
                        <dd>{entity.company.name}</dd>
                      </div>
                      <div>
                        <dt>Manager Name</dt>
                        <dd>{entity.name}</dd>
                      </div>
                      <div>
                        <dt>Manager Email</dt>
                        <dd>{entity.email}</dd>
                      </div>
                      <div>
                        <dt>Reps</dt>
                        <dd>{entity.repsCount}</dd>
                      </div>
                    </dl>
                    <div style={{ width: '20%' }}>
                      <Toggle
                        toggled={entity.active}
                        onToggle={toggleManager(entity)}
                        style={{ margin: '0 auto', width: 36 }}
                      />
                    </div>
                  </div>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="shadow hide-on-mobile">
        <Table
          bodyStyle={{ minWidth: 870 }}
          className="managers-table"
          fixedHeader
          height="calc(100vh - 229px)"
          wrapperStyle={{ minWidth: 870 }}
        >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Company Name</TableHeaderColumn>
              <TableHeaderColumn>Manager Name</TableHeaderColumn>
              <TableHeaderColumn>Manager Email</TableHeaderColumn>
              <TableHeaderColumn>Reps</TableHeaderColumn>
              <TableHeaderColumn>Active</TableHeaderColumn>
              <TableHeaderColumn>Card</TableHeaderColumn>
              <TableHeaderColumn>Current plan</TableHeaderColumn>
              <TableHeaderColumn>Login as Manager</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {managers.map(entity => (
              <TableRow
                displayBorder={false}
                key={entity.id}
                selectable={false}
              >
                <TableRowColumn>{entity.company.name}</TableRowColumn>
                <TableRowColumn>{entity.name}</TableRowColumn>
                <TableRowColumn>{entity.email}</TableRowColumn>
                <TableRowColumn>{entity.repsCount}</TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    toggled={entity.active}
                    onToggle={toggleManager(entity)}
                  />
                </TableRowColumn>
                <TableRowColumn>{cardInfo(entity.stripeCard)}</TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    label={entity.pricing.name || 'no plan'}
                    onClick={() => setCurrentManager(entity)}
                    primary
                  />
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'right' }}>
                  <IconButton
                    onClick={() => {
                      loginAsManager(entity.id)
                    }}
                  >
                    <UserIcon name="user" />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {currentManager && (
          <Subscriptions
            open
            title={`${currentManager.name} subscription`}
            onRequestClose={() => setCurrentManager(null)}
            pricings={pricings}
            managerId={currentManager.id}
            managerPricingId={currentManager.pricing.id}
            updateManagerPricing={updateManagerPricing}
            currentManagerPricings={currentManager.pricings}
            removeManagerPricing={removeManagerPricing}
          />
        )}
      </div>
    </div>
    <div className="hide-on-mobile">
      <AddAManager />
    </div>
  </div>
)

const UserIcon = styled(VectorIcon)`
  > path {
    fill: #000;
    opacity: 0.4;
  }
`

Managers.propTypes = {
  currentManager: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  loginAsManager: PropTypes.func.isRequired,
  managers: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  pricings: PropTypes.array.isRequired,
  removeManagerPricing: PropTypes.func.isRequired,
  setCurrentManager: PropTypes.func.isRequired,
  toggleManager: PropTypes.func.isRequired,
  updateManagerPricing: PropTypes.func.isRequired,
}

export default smartify(Managers)
