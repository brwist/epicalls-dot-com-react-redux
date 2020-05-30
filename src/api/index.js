import jwtDecode from 'jwt-decode'
import { createCookie } from 'utils/manage-cookies'

import { logout, updateToken, loginAs } from 'actions'

import * as actionTypes from 'constants/action-types'
import {
  makeActionCreator,
  makeIdActionCreator,
  makePostActionCreator,
  makePostIdActionCreator,
  makeIdDeleteActionCreator,
  makeSendFileActionCreator,
  makeReducer,
  makeRawReducer,
} from './helpers'

const endpoint = process.env.ENDPOINT
const makeAction = makeActionCreator(endpoint, fetch)
const makeIdAction = makeIdActionCreator(endpoint, fetch)
const makePostAction = makePostActionCreator(endpoint, fetch)
const makeIdPostAction = makePostIdActionCreator(endpoint, fetch)
const makeIdDeleteAction = makeIdDeleteActionCreator(endpoint, fetch)
const makeSendFileAction = makeSendFileActionCreator(endpoint, fetch)

const api = {
  actions: {
    // Users
    login: makePostAction('user_token', { after: saveToken }),
    signup: makePostAction('signup'),
    passwordReset: makeIdPostAction('password_resets', { method: 'PATCH' }),
    resetPassword: makePostAction('password_resets'),
    currentUser: makeAction('currentUser', 'current_user', {
      handleFailed: resetAuth,
    }),
    updateCurrentUser: makePostAction('current_user', {
      method: 'PATCH',
      after: reloadUser,
    }),
    updateCurrentUserPassword: makePostAction('current_user_password'),

    // Emails
    addEmail: makePostAction('emails', { after: reloadUser }),
    changeEmail: makeIdPostAction('emails', {
      method: 'PATCH',
      after: reloadUser,
    }),
    removeEmail: makeIdDeleteAction('emails', { after: reloadUser }),
    confirmEmail: makeIdPostAction('confirm_email', { after: reloadUser }),

    // Reps
    createRep: makePostAction('create_rep', { after: reloadUser }),
    removeRep: makeIdDeleteAction('remove_rep', { after: reloadUser }),
    removeRepLocalNumbers: makeIdDeleteAction('remove_rep_local_numbers', {
      after: reloadUser,
    }),
    removeRepLocalNumber: makeIdDeleteAction('remove_rep_local_number', {
      after: reloadUser,
    }),
    updateRep: makeIdPostAction('update_rep', {
      method: 'PATCH',
      after: reloadUser,
    }),
    repToken: makeIdPostAction('rep_token', { after: loginWithNewToken }),
    callTo: makeIdAction('callTo', 'call_to'),
    callApi: makePostAction('reps/call_api'),
    twilioAccessToken: makeAction(
      'twilioAccessToken',
      'current_rep/twilio_access_token',
    ),

    // Managers
    createManager: makePostAction('create_manager', { after: reloadUser }),
    removeManager: makeIdDeleteAction('remove_manager', { after: reloadUser }),
    updateManagerPricing: makeIdPostAction('update_manager_pricing', {
      method: 'PATCH',
      after: reloadUser,
    }),
    removeManagerPricing: makeIdDeleteAction('remove_manager_pricing', {
      after: reloadUser,
    }),
    updateManager: makeIdPostAction('update_manager', {
      method: 'PATCH',
      after: reloadUser,
    }),
    updateManagerInfo: makeIdPostAction('update_manager_info', {
      method: 'PATCH',
      after: reloadUser,
    }),
    managerToken: makeIdPostAction('manager_token', {
      after: loginWithNewToken,
    }),

    // Admins
    createAdmin: makePostAction('create_admin', { after: reloadUser }),

    // Calls
    updateCall: makeIdPostAction('calls', {
      method: 'PATCH',
      after: reloadUser,
    }),
    // newCall: makeAction('newCall', 'new_call'),
    managerCalls: makeAction('managerCalls', 'current_manager/calls'),
    repCalls: makeAction('repCalls', 'current_rep/calls'),

    // Local Numbers
    localNumbers: makeAction('localNumbers', 'local_numbers'),
    addLocalNumber: makePostAction('local_numbers', { after: reloadUser }),
    removeLocalNumber: makeIdDeleteAction('local_numbers', {
      after: reloadUser,
    }),
    updateLocalNumber: makeIdPostAction('update_rep_local_number', {
      method: 'PATCH',
      after: reloadUser,
    }),
    availableLocalNumber: makePostAction('local_numbers/available'),

    // Validate number
    validateNumber: makePostAction('validate_number'),

    // Forwarding Number
    updateForwardingNumber: makeIdPostAction('forwarding_numbers', {
      method: 'PATCH',
      after: reloadUser,
    }),

    // Contacts
    contacts: makeAction('contacts', 'contacts'),
    findContact: makePostAction('contacts/find'),
    addContact: makePostAction('contacts'),
    removeContact: makeIdDeleteAction('contacts', { after: reloadUser }),
    updateContact: makeIdPostAction('contacts', {
      method: 'PATCH',
      after: reloadUser,
    }),
    parseContactsFile: makeSendFileAction('import_contacts/parse_file'),
    importContacts: makePostAction('import_contacts/import', {
      after: reloadUser,
    }),

    // Stats
    stats: makeAction('stats', 'stats'),

    // Add Ons
    addOns: makeAction('addOns', 'add_ons'),
    createAddOn: makePostAction('add_ons', { after: reloadAddOns }),
    removeAddOn: makeIdDeleteAction('add_ons', { after: reloadAddOns }),

    // Validate forwarding number
    makeValidationCall: makePostAction('make_validation_call'),
    checkConfirmationCode: makePostAction('confirm_forwarding_number', {
      after: reloadUser,
    }),

    // Webhooks
    createWebhook: makePostAction('webhooks', { after: reloadUser }),
    removeWebhook: makeIdDeleteAction('webhooks', { after: reloadUser }),
    testWebhook: makeIdPostAction('test_webhook'),

    // WebhookActions
    webhookActions: makeAction('webhookActions', 'webhook_actions'),

    // Upcoming Calls
    createUpcomingCall: makePostAction('upcoming_calls', { after: reloadUser }),
    removeUpcomingCall: makeIdDeleteAction('upcoming_calls', {
      after: reloadUser,
    }),

    // Call API
    createCallApiNumber: makePostAction('reps/create_call_api_number', {
      after: reloadUser,
    }),

    // Conferences
    conferences: makeAction('conferences', 'conferences'),
    repConferences: makeAction('repConferences', 'current_rep/conferences'),
    joinConference: makePostAction('conferences/join'),

    // Pricings
    pricings: makeAction('pricings', 'current_admin/pricings'),
    publishedPricings: makeAction(
      'publishedPricings',
      'current_manager/pricings',
    ),
    createPricing: makePostAction('current_admin/pricings', {
      after: reloadPricings,
    }),
    updatePricing: makeIdPostAction('current_admin/pricings', {
      method: 'PATCH',
      after: reloadPricings,
    }),
    removePricing: makeIdDeleteAction('current_admin/pricings', {
      after: reloadPricings,
    }),
    choosePricing: makePostAction('current_manager/pricings/choose', {
      after: reloadUser,
    }),
    addPricingToAManager: makePostAction(
      'current_admin/pricings/add_manager_pricing',
      { after: reloadUser },
    ),
    removePricingFromAManager: makePostAction(
      'current_admin/pricings/remove_manager_pricing',
      { after: reloadUser },
    ),

    // Stripe
    stripeAttachSource: makePostAction('current_manager/stripe/attach_source', {
      after: reloadUser,
    }),
    stripeDetachSource: makePostAction('current_manager/stripe/detach_source', {
      after: reloadUser,
    }),

    // Stripe Plans
    stripePlans: makeAction('stripePlans', 'current_admin/stripe_plans'),
    updateStripePlan: makeIdPostAction('current_admin/stripe_plans', {
      method: 'PATCH',
      after: reloadPlans,
    }),

    // Stripe Subscriptions
    createStripeSubscription: makePostAction(
      'current_admin/stripe_subscriptions',
      { after: reloadUser },
    ),
    removeStripeSubscription: makeIdDeleteAction(
      'current_admin/stripe_subscriptions',
      { after: reloadUser },
    ),

    // Messages
    messages: makeAction('messages', 'current_rep/messages'),
    sendMessage: makePostAction('current_rep/messages'),

    // Planhat
    updatePlanhatApiKey: makePostAction(
      'current_manager/company/update_planhat_api_key',
      { after: reloadUser },
    ),

    // Twilio
    twilioCountries: makeAction(
      'twilioCountries',
      'current_rep/twilio_countries',
    ),
  },
  reducers: {
    users: makeReducer('users'),
    contacts: makeReducer('contacts'),
    localNumbers: makeReducer('localNumbers'),
    stats: makeReducer('stats'),
    conferences: makeReducer('conferences'),
    repConferences: makeReducer('repConferences'),
    webhookActions: makeReducer('webhookActions'),
    managerCalls: makeReducer('managerCalls'),
    repCalls: makeReducer('repCalls'),
    pricings: makeReducer('pricings'),
    publishedPricings: makeReducer('publishedPricings'),
    stripePlans: makeReducer('stripePlans'),
    twilioAccessToken: makeReducer('twilioAccessToken'),
    twilioCountries: makeReducer('twilioCountries'),
    messages: makeRawReducer('messages', {
      defaultState: [],
      reducer: (state = [], action) => {
        if (action.type === actionTypes.MESSAGE_RECEIVED) {
          return [...state, action.payload]
        }
        if (action.type === actionTypes.MESSAGES_CLEAR) return []
        return state
      },
    }),
    addOns: makeRawReducer('addOns', {
      defaultState: [],
      reducer: (state = [], action) => {
        if (action.type === actionTypes.TOGGLE_ADD_ON) {
          return state.map(addOn => ({
            ...addOn,
            installed:
              addOn.sid === action.payload.sid
                ? !addOn.installed
                : addOn.installed,
          }))
        }
        return state
      },
    }),
    currentUser: makeRawReducer('currentUser', {
      reducer: (state = {}, action) => {
        if (action.type === actionTypes.LOGOUT) {
          return null
        }
        return state
      },
    }),
    // newCall: makeRawReducer('newCall', {
    //   reducer: (state = null, action) => {
    //     if (action.type === actionTypes.HANGUP_CALL) {
    //       return null
    //     }
    //     return state
    //   },
    // }),
    callTo: makeRawReducer('callTo', {
      defaultState: null,
      reducer: (state, action) => {
        if (action.type === actionTypes.HANGUP_CALL) {
          return null
        }
        return state
      },
    }),
  },
}

function saveToken({ data, dispatch }) {
  const token = jwtDecode(data.jwt)
  createCookie('token', data.jwt, token.exp)
  return dispatch(updateToken(data.jwt))
}

function loginWithNewToken({ data, dispatch }) {
  const token = jwtDecode(data.jwt)
  createCookie('secondary_token', data.jwt, token.exp)
  dispatch(loginAs(token.role))
  return dispatch(updateToken(data.jwt))
}

function resetAuth({ dispatch, error }) {
  return dispatch(logout())
}

function reloadUser({ dispatch, data }) {
  dispatch(api.actions.currentUser.get())
  return data
}

function reloadAddOns({ dispatch, data }) {
  dispatch(api.actions.addOns.get())
  return data
}

function reloadPricings({ dispatch, data }) {
  dispatch(api.actions.pricings.get())
  dispatch(api.actions.currentUser.get())
  return data
}

function reloadPlans({ dispatch, data }) {
  dispatch(api.actions.stripePlans.get())
  return data
}

export default api
