import React from 'react'
import AddARep from 'widgets/add-a-rep'
import MyAccountLayout from 'layouts/my-account'

const AddRep = props => (
  <MyAccountLayout title="New Rep">
    <AddARep />
  </MyAccountLayout>
)

export default AddRep
