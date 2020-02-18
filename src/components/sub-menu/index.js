import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styled from 'styled-components'

const circle = require('assets/images/dial-pad-circle.png')

const Badge = styled.span`
  background-image: url(${circle});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  color: #fff !important;
  width: 25px;
  height: 25px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  font-size: 80%;
`

export const items = {
  admin: [
    { name: 'Managers', path: '/' },
    { name: 'Admins', path: '/admins' },
    { name: 'Pricing', path: '/pricing' },
    // { name: 'Plans', path: '/plans' },
  ],
  manager: [
    { name: 'Reps', path: '/' },
    { name: 'Call logs', path: '/call-logs' },
    { name: 'Usage', path: '/manager-usage' },
    { name: 'Add-Ons', path: '/add-ons' },
    { name: 'Webhooks', path: '/webhooks' },
    { name: 'Conferences', path: '/conferences' },
  ],
  rep: [
    { name: 'Upcoming Calls', path: '/' },
    { name: 'Call logs', path: '/call-logs' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Conferences', path: '/conferences' },
    { name: 'Messages', path: '/messages' },
  ],
}

const SubMenu = ({ role, path, unreadMessagesCount }) => (
  <div className="submenu">
    {items[role].map(i => (
      <Link
        className={cx({ active: path === i.path })}
        key={i.path}
        to={i.path}
      >
        {i.name}
        {i.name === 'Messages' &&
          unreadMessagesCount > 0 && <Badge>{unreadMessagesCount}</Badge>}
      </Link>
    ))}
  </div>
)

SubMenu.propTypes = {
  path: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  unreadMessagesCount: PropTypes.number,
}

export default SubMenu
