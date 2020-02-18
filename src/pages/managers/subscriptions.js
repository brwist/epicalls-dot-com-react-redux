import React from 'react'
import PropTypes from 'prop-types'
import DialogBox from 'components/dialog-box'
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const Subscriptions = ({
  pricings,
  managerPricingId,
  managerId,
  updateManagerPricing,
  removeManagerPricing,
  currentManagerPricings,
  ...props
}) => (
  <DialogBox {...props} autoScrollBodyContent>
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Plan Name</TableHeaderColumn>
          <TableHeaderColumn>Show on pricing</TableHeaderColumn>
          <TableHeaderColumn>Subscription</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows>
        {pricings.map(entity => (
          <TableRow displayBorder={false} key={entity.id} selectable={false}>
            <TableRowColumn>{entity.name}</TableRowColumn>
            <TableRowColumn>
              {currentManagerPricings.find(p => p.id === entity.id)
                ? 'yes'
                : 'no'}
            </TableRowColumn>
            <TableRowColumn>
              <FlatButton
                label={
                  managerPricingId === entity.id ? 'unsubscribe' : 'subscribe'
                }
                onClick={
                  managerPricingId === entity.id
                    ? removeManagerPricing()
                    : updateManagerPricing(entity.id)
                }
                primary
              />
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </DialogBox>
)

Subscriptions.propTypes = {
  currentManagerPricings: PropTypes.array,
  managerId: PropTypes.number.isRequired,
  managerPricingId: PropTypes.number,
  pricings: PropTypes.array.isRequired,
  removeManagerPricing: PropTypes.func.isRequired,
  updateManagerPricing: PropTypes.func.isRequired,
}

export default Subscriptions
