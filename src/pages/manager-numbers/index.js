import React from 'react'
import PropTypes from 'prop-types'
import GoBack from 'widgets/go-back'
import PurchasedNumbers from './purchased-numbers'
import OutboundNumbers from './outbound-numbers'

const ManagerNumbers = props => (
  <div>
    <GoBack />
    <div
      className="hide-on-mobile"
      style={{ height: '2rem', lineHeight: '1' }}
    />
    <div className="my-numbers-grid">
      <OutboundNumbers {...props} />
      <PurchasedNumbers {...props} />
    </div>
  </div>
)

ManagerNumbers.propTypes = {
  currentUser: PropTypes.object,
}

export default ManagerNumbers
