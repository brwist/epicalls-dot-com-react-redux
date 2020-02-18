import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import FlatButton from 'material-ui/FlatButton'
import InputSelect from 'components/input-select'
import MenuItem from 'material-ui/MenuItem'
import smartify from './smartify'

const EmailText = ({ email, confirmed }) => {
  if (confirmed) {
    return (
      <span>
        {email} <span style={{ fontSize: 12 }}>confirmed</span>
      </span>
    )
  }
  return <span>{email}</span>
}

EmailText.propTypes = {
  confirmed: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
}

const RemoveEmail = ({ emails, submit, form }) => (
  <Form model="removeUserEmail" onSubmit={submit}>
    <InputSelect floatingLabelText="Choose Email" model=".id">
      {emails.map(email => (
        <MenuItem
          key={email.id}
          primaryText={EmailText(email)}
          value={email.id}
        />
      ))}
    </InputSelect>
    <FlatButton
      label="Remove Email"
      secondary
      style={{ marginLeft: 24, position: 'relative', bottom: 16 }}
      type="submit"
    />
    {form.submitted && (
      <div style={{ color: '#388E3C', marginTop: 4 }}>Email was removed.</div>
    )}
  </Form>
)

RemoveEmail.propTypes = {
  emails: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(RemoveEmail)
