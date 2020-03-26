import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Routes from './routes'
import smartify from './smartify'

const Root = props => {
	return (
	  <Provider {...props}>
	    <HashRouter>
	      <Routes {...props}/>
	    </HashRouter>
	  </Provider>
	)
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  company: PropTypes.array,
  notFound: PropTypes.func
}

export default smartify(Root)
