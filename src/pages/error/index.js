import React from 'react'
import PropTypes from 'prop-types'

const ErrorComponent = ({ error }) => {
  if (window.Raven) {
    window.Raven.captureException(error)
  } else {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  return (
    <div>
      Error :( <br /> We are working on it
    </div>
  )
}

ErrorComponent.propTypes = {
  error: PropTypes.any,
}

export default ErrorComponent
