import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'components/logo'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'

const Header = ({ loggedAs, mainMenu }) => {
  const style = {
    boxShadow: 'none',
    paddingRight: 18,
  }
  if (loggedAs) style.backgroundColor = '#ede7ec'
  return (
    <AppBar
      className="header"
      iconElementLeft={
        <Link to="/">
          <Logo height={33} width={155} />
        </Link>
      }
      iconElementRight={mainMenu}
      iconStyleLeft={{ marginTop: 6, marginLeft: 8 }}
      iconStyleRight={{
        backgroundImage: 'linear-gradient(225deg, #56c2cd, #83a4d5)',
        width: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={style}
    />
  )
}

Header.propTypes = {
  loggedAs: PropTypes.string,
  mainMenu: PropTypes.element.isRequired,
}

export default Header
