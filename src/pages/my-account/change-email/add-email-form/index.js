import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import FlatButton from 'material-ui/FlatButton'
import smartify from './smartify'

const AddEmailForm = ({ form, email, submit }) => (
  <Form model="addUserEmail" onSubmit={submit}>
    <InputText floatingLabelText="Email" model=".email.email" />
    <FlatButton
      label="Change Email"
      primary
      style={{ marginLeft: 24 }}
      type="submit"
    />
    <ErrorBox model="addUserEmail.commonErrors" show />
    {form.submitted && (
      <div style={{ color: '#388E3C', marginTop: 4 }}>
        Confirmation email was sent to {email}
      </div>
    )}
  </Form>
)

AddEmailForm.propTypes = {
  email: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(AddEmailForm)
