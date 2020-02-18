import React from 'react'
import PropTypes from 'prop-types'
import GoBack from 'widgets/go-back'
import PurchasedNumbers from './purchased-numbers'
import ForwardingNumber from './forwarding-number'

const MyNumbers = props => (
  <div>
    <GoBack />
    <div
      className="hide-on-mobile"
      style={{ height: '2rem', lineHeight: '1' }}
    />
    <div className="my-numbers-grid">
      <ForwardingNumber {...props} />
      <PurchasedNumbers {...props} />
    </div>
  </div>
)

MyNumbers.propTypes = {
  currentUser: PropTypes.object,
}

export default MyNumbers
