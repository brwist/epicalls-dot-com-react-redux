import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import VectorIcon from 'vector-icon'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { items } from 'components/sub-menu'

const MainMenu = ({ role, logout, backToMainAccount, loggedAs }) => (
  <IconMenu
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    animated={false}
    iconButtonElement={
      <IconButton>
        <VectorIcon name="menu" />
      </IconButton>
    }
    listStyle={{ backgroundColor: '#56c2cd', borderRadius: '0 0 0 5px' }}
    menuItemStyle={{ color: '#fff', fontSize: 13 }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      containerElement={<Link to="/my-account" />}
      innerDivStyle={menuItemInnerDivStyle}
      key="my-account"
      leftIcon={<VectorIcon name="user" style={mainMenuIconStyle} />}
      primaryText="My Account"
    />
    {role !== 'admin' && (
      <MenuItem
        containerElement={<Link to="/my-numbers" />}
        innerDivStyle={menuItemInnerDivStyle}
        key="my-numbers"
        leftIcon={<VectorIcon name="myNumbers" style={mainMenuIconStyle} />}
        primaryText="My Numbers"
      />
    )}
    {role === 'manager' && (
      <MenuItem
        containerElement={<Link to="/billing" />}
        innerDivStyle={menuItemInnerDivStyle}
        key="billing"
        leftIcon={<VectorIcon name="myNumbers" style={mainMenuIconStyle} />}
        primaryText="Billing"
      />
    )}
    {loggedAs && (
      <MenuItem
        innerDivStyle={menuItemInnerDivStyle}
        key="backToMainAccount"
        leftIcon={<VectorIcon name="signOut" style={mainMenuIconStyle} />}
        onClick={backToMainAccount}
        primaryText="Return to my Account"
      />
    )}
    {items[role].map(item => (
      <MenuItem
        className="hide-on-desktop"
        containerElement={<Link to={item.path} />}
        innerDivStyle={menuItemInnerDivStyle}
        key={item.path}
        leftIcon={<VectorIcon name="myNumbers" style={mainMenuIconStyle} />}
        primaryText={item.name}
      />
    ))}
    <MenuItem
      primaryText="Sign out"
      onClick={logout}
      innerDivStyle={{ padding: menuItemInnerDivStyle.padding }}
      leftIcon={<VectorIcon name="signOut" style={mainMenuIconStyle} />}
    />
  </IconMenu>
)

const mainMenuIconStyle = {
  width: 13,
  height: 13,
  margin: 0,
  top: 17,
  left: 21,
}

const menuItemInnerDivStyle = {
  padding: '0 16px 0 46px',
  borderBottom: '1px solid rgba(255, 255, 255, .3)',
}

MainMenu.propTypes = {
  backToMainAccount: PropTypes.func.isRequired,
  loggedAs: PropTypes.string,
  logout: PropTypes.func.isRequired,
  role: PropTypes.string,
}

export default MainMenu
