import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Routes from './routes'

const Root = props => (
  <Provider {...props}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
