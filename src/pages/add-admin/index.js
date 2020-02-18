import React from 'react'
import AddAnAdmin from 'widgets/add-an-admin'
import MyAccountLayout from 'layouts/my-account'

const AddAdmin = props => (
  <MyAccountLayout title="New Admin">
    <AddAnAdmin />
  </MyAccountLayout>
)

export default AddAdmin
