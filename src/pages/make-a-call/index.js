import React from 'react'
import MakeACallWidget from 'widgets/make-a-call'
import MyAccountLayout from 'layouts/my-account'

const MakeACall = props => (
  <MyAccountLayout title="Make A Call">
    <MakeACallWidget />
  </MyAccountLayout>
)

MakeACall.propTypes = {}

export default MakeACall
