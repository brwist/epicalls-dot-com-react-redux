import React from 'react'
import AddAManager from 'widgets/add-a-manager'
import MyAccountLayout from 'layouts/my-account'

const AddManager = props => (
  <MyAccountLayout title="New Manager">
    <AddAManager />
  </MyAccountLayout>
)

export default AddManager
