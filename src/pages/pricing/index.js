import React from 'react'
import PropTypes from 'prop-types'
import AddPricing from 'widgets/add-pricing'
import SubMenu from 'components/sub-menu'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import AddButton from 'components/add-button'
import { Link } from 'react-router-dom'
import AlertBox from 'components/alert-box'
import VectorIcon from 'vector-icon'
import Toggle from 'material-ui/Toggle'
import PricingEditModal from './pricing-edit'
import smartify from './smartify'

const Pricing = ({
  currentUser,
  match,
  pricings,
  pricingsRequestStatus,
  toggleShowOnPricing,
  update,
  remove,
  currentPricing,
  setCurrentPricing,
  clearCurrentPricing,
}) => (
  <div className="main-dashboard">
    <div className="header-and-action hide-on-desktop">
      <h2>Pricings</h2>
      <AddButton containerElement={<Link to="/add-pricing" />} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SubMenu
        path={match.path}
        role={currentUser.role}
        unreadMessagesCount={currentUser.unreadMessagesCount}
      />
    </div>
    <div />
    <div>
      <div className="hide-on-desktop">
        <Table>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {pricings.map(entity => (
              <TableRow
                displayBorder={false}
                key={entity.id}
                onClick={setCurrentPricing({ ...entity, edit: true })}
              >
                <TableRowColumn>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <dl className="mobile-table-dl" style={{ width: '80%' }}>
                      <div>
                        <dt>Plan Name</dt>
                        <dd>{entity.name}</dd>
                      </div>
                      <div>
                        <dt>Price per sit</dt>
                        <dd>
                          ${entity.pricePerSit}
                          .00
                        </dd>
                      </div>
                      <div>
                        <dt>Price per local number</dt>
                        <dd>
                          ${entity.pricePerLocalNumber}
                          .00
                        </dd>
                      </div>
                      <div>
                        <dt>Price per 1000 minutes</dt>
                        <dd>
                          ${entity.pricePerThousandMinutes}
                          .00
                        </dd>
                      </div>
                    </dl>
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
          className="pricings-table"
          fixedHeader
          height="calc(100vh - 229px)"
          wrapperStyle={{ minWidth: 870 }}
        >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Plan Name</TableHeaderColumn>
              <TableHeaderColumn>Price per sit</TableHeaderColumn>
              <TableHeaderColumn>Price per local number</TableHeaderColumn>
              <TableHeaderColumn>Price per 1000 minutes</TableHeaderColumn>
              <TableHeaderColumn>Show on pricing</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 40 }} />
              <TableHeaderColumn style={{ width: 40 }} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {pricings.map(entity => (
              <TableRow
                displayBorder={false}
                key={entity.id}
                selectable={false}
              >
                <TableRowColumn>{entity.name}</TableRowColumn>
                <TableRowColumn>
                  ${entity.pricePerSit}
                  .00
                </TableRowColumn>
                <TableRowColumn>
                  ${entity.pricePerLocalNumber}
                  .00
                </TableRowColumn>
                <TableRowColumn>
                  ${entity.pricePerThousandMinutes}
                  .00
                </TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    toggled={entity.showOnPricing}
                    onToggle={toggleShowOnPricing(entity.id)}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center', width: 40 }}>
                  <VectorIcon
                    name="edit"
                    style={{ cursor: 'pointer' }}
                    onClick={setCurrentPricing({ ...entity, edit: true })}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center', width: 40 }}>
                  <VectorIcon
                    name="trash"
                    style={{ cursor: 'pointer' }}
                    onClick={setCurrentPricing({ ...entity, remove: true })}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    <div className="hide-on-mobile">
      <AddPricing
        managers={currentUser.managers}
        pricingsRequestStatus={pricingsRequestStatus}
      />
    </div>
    {currentPricing &&
      currentPricing.edit && (
        <PricingEditModal
          close={clearCurrentPricing}
          currentPricing={currentPricing}
          managers={currentUser.managers}
          open
          submit={update}
        />
      )}
    {currentPricing &&
      currentPricing.remove && (
        <AlertBox onRequestClose={clearCurrentPricing} yesAction={remove} open>
          Remove pricing <b>{currentPricing.name}</b> ?
        </AlertBox>
      )}
  </div>
)

Pricing.propTypes = {
  clearCurrentPricing: PropTypes.func.isRequired,
  currentPricing: PropTypes.any,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  pricings: PropTypes.array.isRequired,
  pricingsRequestStatus: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  setCurrentPricing: PropTypes.func.isRequired,
  toggleShowOnPricing: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
}

export default smartify(Pricing)
