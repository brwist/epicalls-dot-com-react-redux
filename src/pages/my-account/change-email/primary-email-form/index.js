import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import FlatButton from 'material-ui/FlatButton'
import InputSelect from 'components/input-select'
import MenuItem from 'material-ui/MenuItem'
import smartify from './smartify'

const ChangeEmail = ({ currentEmailId, emails, submit, form }) => (
  <Form model="changeUserEmail" onSubmit={submit}>
    <InputSelect
      defaultValue={currentEmailId}
      floatingLabelText="Confirmed Emails"
      model=".id"
    >
      {emails.map(email => (
        <MenuItem key={email.id} primaryText={email.email} value={email.id} />
      ))}
    </InputSelect>
    <FlatButton
      label="Change Email"
      primary
      style={{ marginLeft: 24, position: 'relative', bottom: 16 }}
      type="submit"
    />
    {form.submitted && (
      <div style={{ color: '#388E3C', marginTop: 4 }}>
        Email was changed, use it for a new login.
      </div>
    )}
  </Form>
)

ChangeEmail.propTypes = {
  currentEmailId: PropTypes.number.isRequired,
  emails: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(ChangeEmail)
