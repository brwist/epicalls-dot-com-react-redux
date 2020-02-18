import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Button = ({
  component = 'button',
  primary,
  bordered,
  warning,
  className,
  ...rest
}) => {
  const classes = cx(
    'button',
    {
      'button--bordered': bordered,
      'button--warning': warning,
      'button--primary': primary,
    },
    className,
  )

  return React.createElement(component, {
    className: classes,
    ...rest,
  })
}

Button.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.any,
  primary: PropTypes.bool,
  warning: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
