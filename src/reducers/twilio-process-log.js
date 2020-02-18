import {
  ADD_TWILIO_PROCESS_LOG,
  CLEAR_TWILIO_PROCESS_LOG,
} from 'constants/action-types'

export default function(state = [], action) {
  if (action.type === ADD_TWILIO_PROCESS_LOG) {
    return [...state, action.payload]
  }
  if (action.type === CLEAR_TWILIO_PROCESS_LOG) {
    return []
  }
  return state
}
