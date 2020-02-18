import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import FlatButton from 'material-ui/FlatButton'
import MyAccountLayout from 'layouts/my-account'
import smartify from './smartify'

const ChangeName = ({ currentUser, submit }) => (
  <MyAccountLayout title="Change Name">
    <Form model="changeUserFirstName" onSubmit={submit}>
      <InputText
        defaultValue={currentUser.firstName}
        floatingLabelText="Name"
        model=".user.firstName"
      />
      <FlatButton
        label="Update Name"
        primary
        style={{ marginLeft: 24 }}
        type="submit"
      />
      <ErrorBox model="changeUserFirstName.commonErrors" show />
    </Form>
  </MyAccountLayout>
)

ChangeName.propTypes = {
  currentUser: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(ChangeName)
