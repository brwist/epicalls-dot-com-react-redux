import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'material-ui/Toggle'
import SubMenu from 'components/sub-menu'
import Snackbar from 'material-ui/Snackbar'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import smartify from './smartify'

const AddOns = ({
  currentUser,
  addOns,
  toggle,
  match,
  planhatEnabled,
  togglePlanhat,
  submit,
  planhatApiKeyUpdated,
  togglePlanhatApiKeyUpdated,
  planhatApiKey,
}) => (
  <div>
    <div className="header-and-action hide-on-desktop">
      <h2>Add-Ons</h2>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 24,
      }}
    >
      <SubMenu
        path={match.path}
        role={currentUser.role}
        unreadMessagesCount={currentUser.unreadMessagesCount}
      />
    </div>
    <div>
      <div>
        <div className="hide-on-desktop">
          <Table>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {addOns.map(entity => (
                <TableRow displayBorder={false} key={entity.sid}>
                  <TableRowColumn>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <dl
                        className="mobile-table-dl add-ons"
                        style={{ flexGrow: 1 }}
                      >
                        <div>
                          <dt>Name</dt>
                          <dd>{entity.friendlyName}</dd>
                        </div>
                        <div>
                          <dt>Description</dt>
                          <dd>{entity.description}</dd>
                        </div>
                      </dl>
                      <div style={{ width: 50 }}>
                        <Toggle
                          toggled={entity.installed}
                          onToggle={toggle(entity.sid, entity.installed)}
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
            className="add-ons-table"
            fixedHeader
            height="calc(100vh - 229px)"
            wrapperStyle={{ minWidth: 870 }}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{ width: '30%' }}>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: '50%' }}>
                  Description
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: '20%' }} />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {addOns.map(entity => (
                <TableRow displayBorder={false} key={entity.sid}>
                  <TableRowColumn style={{ width: '30%' }}>
                    {entity.friendlyName}
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '50%' }}>
                    {entity.description}
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '20%' }}>
                    <Toggle
                      toggled={entity.installed}
                      onToggle={toggle(entity.sid, entity.installed)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
              <TableRow displayBorder={false}>
                <TableRowColumn style={{ width: '30%' }}>
                  Planhat
                </TableRowColumn>
                <TableRowColumn style={{ width: '50%' }}>
                  <p>
                    Planhat is an enterprise level Customer Success platform,
                    simplifying customer success and lowering churn for
                    businesses globally
                  </p>
                  {planhatEnabled && (
                    <Form model="planhat" onSubmit={submit}>
                      Your Tenant Token{' '}
                      <InputText
                        style={{ width: '100%', padding: '0 10px' }}
                        defaultValue={planhatApiKey || ''}
                        model=".planhatApiKey"
                      />
                    </Form>
                  )}
                </TableRowColumn>
                <TableRowColumn style={{ width: '20%' }}>
                  <Toggle toggled={planhatEnabled} onToggle={togglePlanhat} />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
    {planhatApiKeyUpdated && (
      <Snackbar
        autoHideDuration={5000}
        contentStyle={{
          color: 'rgb(255, 64, 129)',
        }}
        message="Updated successfully!"
        onRequestClose={togglePlanhatApiKeyUpdated}
        open={!!planhatApiKeyUpdated}
      />
    )}
  </div>
)

AddOns.propTypes = {
  addOns: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  planhatEnabled: PropTypes.bool.isRequired,
  togglePlanhat: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  planhatApiKeyUpdated: PropTypes.bool.isRequired,
  togglePlanhatApiKeyUpdated: PropTypes.func.isRequired,
  planhatApiKey: PropTypes.any
}

export default smartify(AddOns)
