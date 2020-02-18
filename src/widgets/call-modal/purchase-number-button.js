import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import cx from 'classnames'
import styled from 'styled-components'

const PurchaseNumberButton = ({ hasLocalNumber, newCall, purchaseNumber }) => {
  const prices = {}
  if (newCall.prices) {
    newCall.prices.forEach(price => {
      prices[price.numberType] = +price.currentPrice * 2
    })
  }
  return (
    <div
      className={cx({
        'purchase-button': true,
        'hide-on-mobile': hasLocalNumber,
      })}
    >
      <RaisedButton
        label="Purchase number"
        onClick={() =>
          purchaseNumber(newCall.areaCode, newCall.country, newCall.to)
        }
        disabled={hasLocalNumber}
        labelStyle={{ whiteSpace: 'nowrap' }}
        primary
      />
      {!hasLocalNumber && (
        <AvailableNumber>
          Number: {newCall.availableNumber}
          <br />
          Cost: ${prices.local} / month
        </AvailableNumber>
      )}
    </div>
  )
}

const AvailableNumber = styled.p`
  font-size: 85%;
`

PurchaseNumberButton.propTypes = {
  hasLocalNumber: PropTypes.bool.isRequired,
  newCall: PropTypes.object.isRequired,
  purchaseNumber: PropTypes.func.isRequired,
}

export default PurchaseNumberButton
