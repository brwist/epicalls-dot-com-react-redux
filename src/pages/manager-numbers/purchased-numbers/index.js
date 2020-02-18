import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VectorIcon from 'vector-icon'
import AlertBox from 'components/alert-box'
import Toggle from 'material-ui/Toggle'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import smartify from './smartify'

const PurchasedNumbers = ({
  currentUser,
  setNumberToRemove,
  toggleRemoveNumberModal,
  numberToRemove,
  removeNumber,
  removeNumberModalOpen,
  updateLocalNumber,
}) => (
  <div className="rounded-card">
    <div className="my-numbers-header">
      <div>My Purchased Numbers</div>
    </div>
    <div className="hide-on-desktop">
      <Table>
        <TableBody displayRowCheckbox={false}>
          {currentUser.salesReps.map(rep =>
            rep.localNumbers.map(localNumber => (
              <TableRow
                key={localNumber.id}
                selectable={false}
                style={{
                  borderBottom: '1px solid #fafafa',
                }}
              >
                <TableRowColumn>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <dl className="my-numbers-dl" style={{ width: '80%' }}>
                      <div>
                        <dt>
                          <VectorIcon name="pin" />
                          Location
                        </dt>
                        <dd>
                          {`${localNumber.country}, ${localNumber.geoName}`}
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <UserIcon name="user" />
                          Rep name
                        </dt>
                        <dd>{rep.name}</dd>
                      </div>
                      <div>
                        <dt>
                          <VectorIcon name="call" />
                          Purchased Number
                        </dt>
                        <dd>{localNumber.number}</dd>
                      </div>
                    </dl>
                    <dl
                      className="my-numbers-dl"
                      style={{ width: '20%', textAlign: 'center' }}
                    >
                      <div>
                        <dt>Shared</dt>
                        <dd>
                          <Toggle
                            toggled={localNumber.shared}
                            onToggle={updateLocalNumber(localNumber)}
                            style={{ margin: '0 auto', width: 36 }}
                          />
                        </dd>
                      </div>
                      <div>
                        <dt>Delete</dt>
                        <dd>
                          <VectorIcon
                            name="trash"
                            style={{ cursor: 'pointer' }}
                            onClick={e => {
                              setNumberToRemove(localNumber)
                              toggleRemoveNumberModal()
                            }}
                          />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </TableRowColumn>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>
    <div className="hide-on-mobile">
      <Table
        height="calc(100vh - 340px)"
        wrapperStyle={{
          borderRadius: 5,
        }}
      >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow
            style={{
              borderBottom: '1px solid #fafafa',
            }}
          >
            <TableHeaderColumn>
              <VectorIcon
                name="pin"
                style={{ position: 'relative', bottom: -3, left: -5 }}
              />
              Location
            </TableHeaderColumn>
            <TableHeaderColumn>
              <UserIcon
                name="user"
                style={{ position: 'relative', bottom: -2, left: -5 }}
              />
              Rep name
            </TableHeaderColumn>
            <TableHeaderColumn>
              <VectorIcon
                name="call"
                style={{ position: 'relative', bottom: -2, left: -5 }}
              />
              Purchased Number
            </TableHeaderColumn>
            <TableHeaderColumn style={{ width: 30 }}>Shared</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 30 }} />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {currentUser.salesReps.map(rep =>
            rep.localNumbers.map(localNumber => (
              <TableRow
                key={localNumber.id}
                selectable={false}
                style={{
                  height: 99,
                  borderBottom: '1px solid #fafafa',
                }}
              >
                <TableRowColumn
                  style={{
                    fontSize: 18,
                    color: '#555759',
                  }}
                >
                  {`${localNumber.geoName}, ${localNumber.country}`}
                </TableRowColumn>
                <TableRowColumn
                  style={{
                    fontSize: 20,
                    letterSpacing: 0.8,
                    color: '#5cbece',
                  }}
                >
                  {rep.name}
                </TableRowColumn>
                <TableRowColumn
                  style={{
                    fontSize: 20,
                    letterSpacing: 0.8,
                    color: '#5cbece',
                  }}
                  title={localNumber.number}
                >
                  {localNumber.number}
                </TableRowColumn>
                <TableRowColumn style={{ width: 30 }}>
                  <Toggle
                    toggled={localNumber.shared}
                    onToggle={updateLocalNumber(localNumber)}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ width: 30 }}>
                  <VectorIcon
                    name="trash"
                    style={{ cursor: 'pointer' }}
                    onClick={e => {
                      setNumberToRemove(localNumber)
                      toggleRemoveNumberModal()
                    }}
                  />
                </TableRowColumn>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>

    <AlertBox
      open={removeNumberModalOpen}
      onRequestClose={toggleRemoveNumberModal}
      yesAction={removeNumber(numberToRemove.id)}
    >
      Remove number <b>{numberToRemove.number}</b> ?
    </AlertBox>
  </div>
)

PurchasedNumbers.propTypes = {
  currentUser: PropTypes.object.isRequired,
  numberToRemove: PropTypes.object.isRequired,
  removeNumber: PropTypes.func.isRequired,
  removeNumberModalOpen: PropTypes.bool.isRequired,
  setNumberToRemove: PropTypes.func.isRequired,
  toggleRemoveNumberModal: PropTypes.func.isRequired,
  updateLocalNumber: PropTypes.func.isRequired,
}

const UserIcon = styled(VectorIcon)`
  > path {
    fill: #000;
    opacity: 0.4;
  }
`

export default smartify(PurchasedNumbers)
