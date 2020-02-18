import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import FlatButton from 'material-ui/FlatButton'
import MyAccountLayout from 'layouts/my-account'
import smartify from './smartify'

const ChangePassword = ({ currentUser, submit }) => (
  <MyAccountLayout title="Change Password">
    <Form
      model="changeUserPassword"
      onSubmit={submit}
      style={{ maxWidth: 400 }}
    >
      {currentUser.role !== 'manager' && (
        <InputText
          autoComplete="new-password"
          floatingLabelText="Old Password"
          fullWidth
          model=".user.oldPassword"
          type="password"
        />
      )}
      <br />
      <InputText
        autoComplete="new-password"
        floatingLabelText="New Password"
        fullWidth
        model=".user.password"
        type="password"
      />
      <br />
      <InputText
        autoComplete="new-password"
        floatingLabelText="Confirm New Password"
        fullWidth
        model=".user.passwordConfirmation"
        type="password"
      />
      <div style={{ textAlign: 'center', paddingTop: 16 }}>
        <FlatButton label="Update Password" primary type="submit" />
      </div>
      <ErrorBox model="changeUserPassword.commonErrors" show />
    </Form>
  </MyAccountLayout>
)

ChangePassword.propTypes = {
  currentUser: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(ChangePassword)
