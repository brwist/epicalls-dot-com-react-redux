import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { logout, clearLoginAs, updateToken } from 'actions'
import { withRouter } from 'react-router'
import withJob from 'utils/with-job'
import { token, currentUser } from 'selectors'
import api from 'api'
import { readCookie, eraseCookie } from 'utils/manage-cookies'

const selector = createStructuredSelector({
  token,
  currentUser,
  loggedAs: store => store.loggedAs,
})

const mapDispatchToProps = (dispatch, props) => ({
  logout: e => {
    e.preventDefault()
    dispatch(logout())
    eraseCookie('token')
    eraseCookie('secondary_token')
  },
  backToMainAccount: () => {
    eraseCookie('secondary_token')
    dispatch(clearLoginAs())
    dispatch(updateToken(readCookie('token')))
  },
  load: () => {
    dispatch(api.actions.currentUser.get())
  },
})

const work = props => {
  if (props.token) {
    props.load()
  }
}

export default compose(
  withRouter,
  connect(
    selector,
    mapDispatchToProps,
  ),
  withJob({ work, shouldWorkAgain: (prev, next) => prev.token !== next.token }),
)
