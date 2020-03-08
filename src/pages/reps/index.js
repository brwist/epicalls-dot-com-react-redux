import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import AlertBox from 'components/alert-box'
import VectorIcon from 'vector-icon'
import AddARep from 'widgets/add-a-rep'
import Toggle from 'material-ui/Toggle'
import SubMenu from 'components/sub-menu'
import AddButton from 'components/add-button'
import { Link } from 'react-router-dom'
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

import EditRepModal from './edit-rep-modal'

const Reps = ({
  currentUser,
  removeSalesRep,
  salesRepToRemove,
  setSalesRepToRemove,
  removeSalesRepModalOpen,
  toggleRemoveSalesRepModal,
  reps,
  loginAsRep,
  toggleRep,
  toggledRep,
  setToggledRep,
  removeRepLocalNumbers,
  setRepToEditForm,
  resetRepForm,
  repToEdit,
  saveRep,
  setRepToEdit,
  openRemoveSalesRepModal,
  match,
}) => (
  <div className="main-dashboard">
    <div className="header-and-action hide-on-desktop">
      <h2>Reps</h2>
      <AddButton containerElement={<Link to="/add-rep" />} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SubMenu
        path={match.path}
        role={currentUser.role}
        unreadMessagesCount={currentUser.unreadMessagesCount}
      />
      <SearchForm model="searchReps" />
    </div>
    <div />
    <div>
      <div className="hide-on-desktop">
        <Table>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {reps.map(entity => (
              <TableRow
                displayBorder={false}
                key={entity.id}
                onClick={() => loginAsRep(entity.id)}
                selectable={false}
              >
                <TableRowColumn>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <dl className="mobile-table-dl" style={{ width: '80%' }}>
                      <div>
                        <dt>Name</dt>
                        <dd>{entity.name}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>{entity.email}</dd>
                      </div>
                      <div>
                        <dt>Forwarding Number</dt>
                        <dd>{entity.number}</dd>
                      </div>
                      <div>
                        <dt>Local Numbers</dt>
                        <dd>{entity.localNumbersCount}</dd>
                      </div>
                    </dl>
                    <div style={{ width: '20%' }}>
                      <Toggle
                        toggled={entity.active}
                        onToggle={(e, isInputChecked) => {
                          if (!isInputChecked && entity.localNumbersCount > 0) {
                            setToggledRep(entity)
                          }
                          toggleRep(entity)
                        }}
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
          className="sales-reps-table"
          fixedHeader
          height="calc(100vh - 229px)"
          wrapperStyle={{ minWidth: 870 }}
        >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Forwarding Number</TableHeaderColumn>
              <TableHeaderColumn>Local Numbers</TableHeaderColumn>
              <TableHeaderColumn>Active</TableHeaderColumn>
              <TableHeaderColumn>Login as Rep</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {reps.map(entity => (
              <TableRow
                displayBorder={false}
                id={`contact-${entity.id}`}
                key={entity.id}
                selectable={false}
              >
                <TableRowColumn>{entity.name}</TableRowColumn>
                <TableRowColumn>{entity.email}</TableRowColumn>
                <TableRowColumn>{entity.number}</TableRowColumn>
                <TableRowColumn>{entity.localNumbersCount}</TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    toggled={entity.active}
                    onToggle={(e, isInputChecked) => {
                      if (!isInputChecked && entity.localNumbersCount > 0) {
                        setToggledRep(entity)
                      }
                      toggleRep(entity)
                    }}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'right' }}>
                  <IconButton
                    onClick={() => {
                      loginAsRep(entity.id)
                    }}
                  >
                    <UserIcon name="user" />
                  </IconButton>
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>
                  <VectorIcon
                    name="edit"
                    style={{ cursor: 'pointer', padding: '8px' }}
                    onClick={() => {
                      resetRepForm()
                      setRepToEditForm(entity)
                      // setContactToEditForm(entity)
                    }}
                  />
                  <VectorIcon
                    name="trash"
                    style={{ cursor: 'pointer', padding: '10px' }}
                    onClick={() => openRemoveSalesRepModal(entity)}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {repToEdit && (
          <EditRepModal
            repToEdit={repToEdit}
            saveRep={saveRep}
            setRepToEdit={setRepToEdit}
          />
        )}
        <AlertBox
          open={removeSalesRepModalOpen}
          yesAction={removeSalesRep}
          onRequestClose={toggleRemoveSalesRepModal}
        >
          Are you sure you want to delete
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1.35,
            }}
          >
            {salesRepToRemove.name}?
          </div>
        </AlertBox>
        <AlertBox
          open={!!toggledRep}
          yesAction={removeRepLocalNumbers(toggledRep)}
          onRequestClose={() => setToggledRep(null)}
        >
          Do you want to release{' '}
          <b>{toggledRep && toggledRep.localNumbersCount}</b> Twilio numbers
          <br />
          purchased by <b>{toggledRep && toggledRep.name}</b>?
        </AlertBox>
      </div>
    </div>
    <div className="hide-on-mobile">
      <AddARep />
    </div>
  </div>
)

const UserIcon = styled(VectorIcon)`
  > path {
    fill: #000;
    opacity: 0.4;
  }
`

Reps.propTypes = {
  currentUser: PropTypes.object.isRequired,
  loginAsRep: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  removeRepLocalNumbers: PropTypes.func.isRequired,
  removeSalesRep: PropTypes.func.isRequired,
  removeSalesRepModalOpen: PropTypes.bool.isRequired,
  reps: PropTypes.array.isRequired,
  salesRepToRemove: PropTypes.object,
  setSalesRepToRemove: PropTypes.func.isRequired,
  setToggledRep: PropTypes.func.isRequired,
  toggleRemoveSalesRepModal: PropTypes.func.isRequired,
  toggleRep: PropTypes.func.isRequired,
  toggledRep: PropTypes.any,
  resetRepForm: PropTypes.func.isRequired,
  setRepToEditForm: PropTypes.func.isRequired,
  repToEdit: PropTypes.any,
  saveRep: PropTypes.func.isRequired,
  setRepToEdit: PropTypes.func.isRequired,
  openRemoveSalesRepModal: PropTypes.func.isRequired,
}

export default smartify(Reps)
