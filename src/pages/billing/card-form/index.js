import React from 'react'
import PropTypes from 'prop-types'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements'
import Button from 'material-ui/FlatButton'
import smartify from './smartify'

// 4242 4242 4242 4242

const createStyle = (fontSize = '18px', padding = {}) => ({
  base: {
    fontSize,
    color: '#424770',
    letterSpacing: '0.025em',
    fontFamily: 'Source Code Pro, monospace',
    '::placeholder': {
      color: '#aab7c4',
    },
    ...(padding ? { padding } : {}),
  },
  invalid: {
    color: '#9e2146',
  },
})

const CardForm = ({ currentUser, submitCardDetails }) => (
  <form
    onSubmit={submitCardDetails({
      name: currentUser.name,
      email: currentUser.email,
    })}
    style={{ maxWidth: 400, margin: '0 auto' }}
  >
    <label>
      Card number
      <CardNumberElement style={createStyle()} />
    </label>
    <label>
      Expiration date
      <CardExpiryElement style={createStyle()} />
    </label>
    <label>
      CVC
      <CardCVCElement style={createStyle()} />
    </label>
    <label>
      Postal code
      <PostalCodeElement style={createStyle()} />
    </label>
    <Button
      fullWidth
      label={currentUser.stripeCard.id ? 'Update card information' : 'Add card'}
      primary
      type="submit"
    />
  </form>
)

CardForm.propTypes = {
  currentUser: PropTypes.object,
  submitCardDetails: PropTypes.func.isRequired,
}

export default smartify(CardForm)
