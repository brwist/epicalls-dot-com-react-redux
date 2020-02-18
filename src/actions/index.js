import * as actionTypes from 'constants/action-types'

export const updateToken = payload => ({
  type: actionTypes.UPDATE_TOKEN,
  payload,
})
export const logout = () => ({ type: actionTypes.LOGOUT })
export const loginAs = payload => ({ type: actionTypes.LOGIN_AS, payload })
export const clearLoginAs = () => ({ type: actionTypes.CLEAR_LOGIN_AS })
export const hangUpCall = () => ({ type: actionTypes.HANGUP_CALL })
export const addTwilioProcessLog = payload => ({
  type: actionTypes.ADD_TWILIO_PROCESS_LOG,
  payload,
})
export const clearTwilioProcessLog = () => ({
  type: actionTypes.CLEAR_TWILIO_PROCESS_LOG,
})
export const toggleAddOn = payload => ({
  type: actionTypes.TOGGLE_ADD_ON,
  payload,
})
export const receiveMessage = payload => ({
  type: actionTypes.MESSAGE_RECEIVED,
  payload,
})
export const clearMessages = () => ({ type: actionTypes.MESSAGES_CLEAR })
