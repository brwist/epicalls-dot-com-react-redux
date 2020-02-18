import React from 'react'
import PropTypes from 'prop-types'

const flags = {
  au: require('assets/images/flags/au.png'),
  ca: require('assets/images/flags/ca.png'),
  us: require('assets/images/flags/us.png'),
  gb: require('assets/images/flags/gb.png'),
  ie: require('assets/images/flags/ie.png'),
}

const CountryFlag = ({ country, ...rest }) => {
  const flag = flags[country.toLowerCase()]
  if (flag) {
    return <img className="flag-icon" src={flag} {...rest} />
  }
  return null
}

CountryFlag.propTypes = {
  country: PropTypes.string.isRequired,
}

export default CountryFlag
