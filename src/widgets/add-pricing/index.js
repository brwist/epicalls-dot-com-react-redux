import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import InputSelect from 'components/input-select'
import MenuItem from 'material-ui/MenuItem'
import ErrorBox from 'components/error-box'
import RoundedRaisedButton from 'components/rounded-raised-button'
import smartify from './smartify'

const AddPricing = ({ submit, pricingsRequestStatus, managers }) => (
  <div className="addWidget">
    <h2 className="hide-on-mobile">
      <span className="bolder">Add</span> Pricing
    </h2>
    <Form model="pricing" onSubmit={submit}>
      <InputText fullWidth hintText="Name" model=".pricing.name" required />
      <br />
      <InputText
        fullWidth
        hintText="Price per sit"
        model=".pricing.pricePerSit"
        required
      />
      <br />
      <InputText
        fullWidth
        hintText="Price per local number"
        model=".pricing.pricePerLocalNumber"
        required
      />
      <br />
      <InputText
        fullWidth
        hintText="Price per 1000 minutes"
        model=".pricing.pricePerThousandMinutes"
        required
      />
      <br />
      <InputSelect
        floatingLabelText="Assign to manager(s)"
        fullWidth
        model=".pricing.managerIds"
        multiple
      >
        {managers.map(manager => (
          <MenuItem
            key={manager.id}
            primaryText={manager.name}
            value={manager.id}
          />
        ))}
      </InputSelect>
      <div>
        <ErrorBox model="pricing.commonErrors" show />
      </div>
      <div style={{ height: 30 }} />
      <RoundedRaisedButton
        disabled={pricingsRequestStatus === 'request'}
        fullWidth
        label="Add pricing"
        primary
        type="submit"
      />
    </Form>
  </div>
)

AddPricing.propTypes = {
  managers: PropTypes.array.isRequired,
  pricingsRequestStatus: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(AddPricing)
