import { LOGIN_AS, CLEAR_LOGIN_AS } from 'constants/action-types'

export default function(state = null, action) {
  if (action.type === LOGIN_AS) {
    return action.payload
  }
  if (action.type === CLEAR_LOGIN_AS) {
    return null
  }
  return state
}
