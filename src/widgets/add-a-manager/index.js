import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import MenuItem from 'material-ui/MenuItem'
import InputSelect from 'components/input-select'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import RoundedRaisedButton from 'components/rounded-raised-button'
import smartify from './smartify'

const AddAManager = ({ submit, companies }) => (
  <div className="addWidget">
    <h2 className="hide-on-mobile">
      <span className="bolder">Add</span> A Manager
    </h2>
    <Form model="manager" onSubmit={submit}>
      <InputText
        fullWidth
        hintText="Full Name"
        model=".manager.firstName"
        required
      />
      <br />
      <InputText fullWidth hintText="Email" model=".manager.email" required />
      <InputSelect
        floatingLabelText="Company"
        fullWidth
        model=".manager.companyId"
        required
      >
        {companies.map(company => (
          <MenuItem
            key={company.id}
            primaryText={company.name}
            value={company.id}
          />
        ))}
      </InputSelect>
      {/* <InputText
      model=".manager.companyAttributes.name"
      hintText="Company Name"
      fullWidth
      required
    />
    <br />
    <InputText
      model=".manager.companyAttributes.url"
      hintText="Company Url"
      fullWidth
      required
    /> */}
      <div>
        <ErrorBox model="manager.commonErrors" show />
      </div>
      <div style={{ height: 30 }} />
      <RoundedRaisedButton
        fullWidth
        label="Send Invite"
        primary
        type="submit"
      />
    </Form>
  </div>
)

AddAManager.propTypes = {
  companies: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(AddAManager)
