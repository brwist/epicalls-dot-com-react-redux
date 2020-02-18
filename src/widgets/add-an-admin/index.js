import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import RoundedRaisedButton from 'components/rounded-raised-button'
import smartify from './smartify'

const AddAnAdmin = ({ submit }) => (
  <div className="addWidget">
    <h2 className="hide-on-mobile">
      <span className="bolder">Add</span> An Admin
    </h2>
    <Form model="admin" onSubmit={submit}>
      <InputText
        fullWidth
        hintText="Full Name"
        model=".admin.firstName"
        required
      />
      <br />
      <InputText fullWidth hintText="Email" model=".admin.email" required />
      <div>
        <ErrorBox model="admin.commonErrors" show />
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

AddAnAdmin.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default smartify(AddAnAdmin)
