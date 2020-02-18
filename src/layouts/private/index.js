import React from 'react'
import PropTypes from 'prop-types'
import MainMenu from 'components/main-menu'
import Header from 'components/header'
import Helmet from 'react-helmet'
import Plans from 'pages/plans'
import Billing from 'pages/billing'
import Twilio from 'components/twilio'
import smartify from './smartify'

const PrivateLayout = ({
  loginComponent,
  logout,
  loggedAs,
  backToMainAccount,
  ...rest
}) => {
  if (!rest.currentUser)
    return <div>{React.createElement(loginComponent, rest)}</div>
  const { currentUser } = rest
  let { page } = rest
  if (currentUser.role === 'admin') {
    page = rest.adminPage || page
  }
  if (currentUser.role === 'manager') {
    page = rest.managerPage || page
    if (
      !currentUser.stripeCard.id &&
      currentUser.company.name !== 'Wishpond support'
    ) {
      page = Billing
    }
    if (!currentUser.pricing.id) page = Plans
  }
  return (
    <div className="private-layout">
      <Helmet title={rest.title} />
      <Header
        loggedAs={loggedAs}
        mainMenu={
          <MainMenu
            backToMainAccount={backToMainAccount}
            loggedAs={loggedAs}
            logout={logout}
            role={currentUser.role}
          />
        }
      />
      <div className="layout-wrapper">
        {currentUser.role === 'rep' && <Twilio />}
        {React.createElement(page, rest)}
      </div>
    </div>
  )
}

PrivateLayout.propTypes = {
  adminPage: PropTypes.any,
  backToMainAccount: PropTypes.func.isRequired,
  loggedAs: PropTypes.string,
  loginComponent: PropTypes.any.isRequired,
  logout: PropTypes.func.isRequired,
  managerPage: PropTypes.any,
  page: PropTypes.any,
}

export default smartify(PrivateLayout)
