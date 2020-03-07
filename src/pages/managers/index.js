import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import VectorIcon from 'vector-icon'
import AlertBox from 'components/alert-box'
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
import EditManagerModal from './edit-manager-modal'

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
  setManagerToEditForm,
  resetManagerForm,
  managerToEdit,
  saveManager,
  setManagerToEdit,
  openRemoveManagerModal,
  removeManager,
  removeManagerModalOpen,
  toggleRemoveManagerModal,
  managerToRemove,
  setManagerToRemove,
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
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {managers.map(entity => (
              <TableRow
                displayBorder={false}
                key={entity.id}
                selectable={false}
                onClick={() => {
                  resetManagerForm()
                  setManagerToEditForm(entity)
                  // setContactToEditForm(entity)
                }}
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
                <TableRowColumn style={{ textAlign: 'center' }}>
                  <VectorIcon
                    name="trash"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openRemoveManagerModal(entity)}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {managerToEdit && (
          <EditManagerModal
            managerToEdit={managerToEdit}
            saveManager={saveManager}
            setManagerToEdit={setManagerToEdit}
          />
        )}
        <AlertBox
          open={removeManagerModalOpen}
          yesAction={removeManager}
          onRequestClose={toggleRemoveManagerModal}
        >
          Are you sure you want to delete
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1.35,
            }}
          >
            {managerToRemove.name}?
          </div>
        </AlertBox>
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
  
  resetManagerForm: PropTypes.func.isRequired,
  setManagerToEditForm: PropTypes.func.isRequired,
  managerToEdit: PropTypes.any,
  saveManager: PropTypes.func.isRequired,
  setManagerToEdit: PropTypes.func.isRequired,
  openRemoveManagerModal: PropTypes.func.isRequired,
  removeManager: PropTypes.func.isRequired,
  removeManagerModalOpen: PropTypes.bool.isRequired,
  toggleRemoveManagerModal: PropTypes.func.isRequired,
  managerToRemove: PropTypes.object,
  setManagerToRemove: PropTypes.func.isRequired,
}

export default smartify(Managers)
