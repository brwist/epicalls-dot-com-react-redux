import React from 'react'
import Layout from 'layouts/guest'

const Inactive = () => (
  <Layout title="Inactive">
    <div style={{ height: 250, paddingTop: 80 }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Inactive</h1>
        <p>Your account is currently inactive</p>
        <p>
          Please wait for an activation email or{' '}
          <a href="mailto:support@epicalls.com">contact our support</a>
        </p>
      </div>
    </div>
  </Layout>
)

export default Inactive
