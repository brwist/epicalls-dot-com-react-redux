import React from 'react'
import MyAccountLayout from 'layouts/my-account'
import AddEmailForm from './add-email-form'

const ChangeEmail = () => (
  <MyAccountLayout title="Update Email">
    <AddEmailForm />
  </MyAccountLayout>
)

export default ChangeEmail
