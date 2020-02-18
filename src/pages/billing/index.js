import React from 'react'
import PropTypes from 'prop-types'
import GoBack from 'widgets/go-back'
import { Elements } from 'react-stripe-elements'
import CreditCard from 'components/credit-card'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import moment from 'moment'
import cx from 'classnames'
import smartify from './smartify'
import CardForm from './card-form'

const Billing = ({ currentUser, detachSource }) => (
  <div>
    {currentUser.stripeCard.id && <GoBack />}
    <div
      className="hide-on-mobile"
      style={{ height: '2rem', lineHeight: '1' }}
    />
    <div
      className={cx({
        'my-numbers-grid': currentUser.stripeCard.id,
        'billing-overview': !currentUser.stripeCard.id,
      })}
    >
      <div className="rounded-card">
        <div className="my-numbers-header">
          <div>Billing Overview</div>
          <div className="my-numbers-header-help">
            Please enter your preferred payment method below. Card will be
            charged monthly.
          </div>
        </div>
        <div className="my-numbers-content">
          <Elements>
            <CardForm currentUser={currentUser} />
          </Elements>
          <div>
            {currentUser.stripeCard.id && (
              <CreditCard
                {...currentUser.stripeCard}
                removeCard={detachSource}
              />
            )}
          </div>
        </div>
      </div>
      {currentUser.stripeCard.id && (
        <div className="rounded-card">
          <div className="my-numbers-header">Upcoming Invoice</div>
          <div className="my-numbers-content">
            {currentUser.upcomingInvoice && (
              <Table
                height="calc(100vh - 340px)"
                wrapperStyle={{ borderRadius: 5 }}
              >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow style={{ borderBottom: '1px solid #fafafa' }}>
                    <TableHeaderColumn>Amount</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn>Start</TableHeaderColumn>
                    <TableHeaderColumn>End</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {currentUser.upcomingInvoice.lines.data.map(line => (
                    <TableRow
                      key={`${line.id}-${line.plan.id}`}
                      selectable={false}
                      style={{ borderBottom: '1px solid #fafafa' }}
                    >
                      <TableRowColumn>
                        $ {(line.amount / 100).toFixed(2)}{' '}
                        {line.currency.toUpperCase()}
                      </TableRowColumn>
                      <TableRowColumn>{line.plan.name}</TableRowColumn>
                      <TableRowColumn>
                        {moment(line.period.start * 1000).toLocaleString()}
                      </TableRowColumn>
                      <TableRowColumn>
                        {moment(line.period.end * 1000).toLocaleString()}
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
)

Billing.propTypes = {
  currentUser: PropTypes.object,
  detachSource: PropTypes.func.isRequired,
}

export default smartify(Billing)
