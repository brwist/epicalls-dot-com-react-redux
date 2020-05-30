import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'

import Reps from './pages/reps'
import Managers from './pages/managers'
import Admins from './pages/admins'
import Signup from './pages/signup'
import Login from './pages/login'
import PasswordReset from './pages/password-reset'
import ResetPassword from './pages/reset-password'
import CallLogs from './pages/call-logs'
import ManagerCallLogs from './pages/manager-call-logs'
import Contacts from './pages/contacts'
import MyNumbers from './pages/my-numbers'
import ManagerNumbers from './pages/manager-numbers'
import ManagerUsage from './pages/manager-usage'
import MyAccount from './pages/my-account'
import ChangeName from './pages/my-account/change-name'
import ChangeEmail from './pages/my-account/change-email'
import ChangePassword from './pages/my-account/change-password'
import ConfirmEmail from './pages/confirm-email'
import AddOns from './pages/add-ons'
import Webhooks from './pages/webhooks'
import Inactive from './pages/inactive'
import UpcomingCalls from './pages/upcoming-calls'
import MakeACall from './pages/make-a-call'
import AddRep from './pages/add-rep'
import AddManager from './pages/add-manager'
import AddAdmin from './pages/add-admin'
import Conferences from './pages/conferences'
import RepConferences from './pages/rep-conferences'
import Pricing from './pages/pricing'
import Plans from './pages/plans'
import ChoosePricing from './pages/choose-pricing'
import Billing from './pages/billing'
import Messages from './pages/messages'
import NotFound from './pages/not-found'

import makeLayoutRoute from './utils/make-layout-route'
import PrivateLayout from './layouts/private'

const PrivateRoute = makeLayoutRoute(PrivateLayout, { loginComponent: Login })

const HomeRedirect = () => <Redirect push to="/" />

const Routes = () => (
  <Switch>
    <PrivateRoute
      adminPage={Managers}
      exact
      managerPage={Reps}
      page={UpcomingCalls}
      path="/"
    />
    <PrivateRoute
      adminPage={Admins}
      exact
      managerPage={HomeRedirect}
      page={HomeRedirect}
      path="/admins"
    />
    <PrivateRoute exact page={ChangeName} path="/my-account/change-name" />
    <PrivateRoute exact page={ChangeEmail} path="/my-account/change-email" />
    <PrivateRoute
      exact
      page={ChangePassword}
      path="/my-account/change-password"
    />
    <PrivateRoute exact page={MyAccount} path="/my-account" />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={ManagerCallLogs}
      page={CallLogs}
      path="/call-logs"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={HomeRedirect}
      page={Contacts}
      path="/contacts"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={ManagerNumbers}
      page={MyNumbers}
      path="/my-numbers"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={ManagerUsage}
      page={HomeRedirect}
      path="/manager-usage/:year?/:month?"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={AddOns}
      page={HomeRedirect}
      path="/add-ons"
    />
    <PrivateRoute exact page={ConfirmEmail} path="/confirm-email/:id/:email" />
    <PrivateRoute
      exact
      managerPage={Webhooks}
      page={HomeRedirect}
      path="/webhooks"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={HomeRedirect}
      page={UpcomingCalls}
      path="/upcoming-calls"
    />
    <PrivateRoute exact page={MakeACall} path="/make-a-call" />
    <PrivateRoute exact page={AddRep} path="/add-rep" />
    <PrivateRoute exact page={AddManager} path="/add-manager" />
    <PrivateRoute exact page={AddAdmin} path="/add-admin" />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={Conferences}
      page={RepConferences}
      path="/conferences"
    />
    <PrivateRoute exact page={ChoosePricing} path="/pricing/:link" />
    <PrivateRoute
      adminPage={Pricing}
      exact
      managerPage={HomeRedirect}
      page={HomeRedirect}
      path="/pricing"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={Plans}
      page={HomeRedirect}
      path="/plans"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={Billing}
      page={HomeRedirect}
      path="/billing"
    />
    <PrivateRoute
      adminPage={HomeRedirect}
      exact
      managerPage={HomeRedirect}
      page={Messages}
      path="/messages"
    />
    <Route component={Signup} path="/signup" />
    <Route component={ResetPassword} path="/reset-password" />
    <Route component={PasswordReset} path="/password-reset/:id/:email" />
    <Route component={Inactive} path="/inactive" />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
