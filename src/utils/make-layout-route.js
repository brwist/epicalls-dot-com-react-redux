import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

export default function(Layout, additional) {
  const LayoutRoute = ({ path, ...rest }) => (
    <Route
      exact
      path={path}
      render={props => <Layout {...additional} {...rest} {...props} />}
    />
  )

  LayoutRoute.propTypes = {
    path: PropTypes.string.isRequired,
  }

  return LayoutRoute
}
