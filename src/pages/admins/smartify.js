import { createSelector, createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { searchQuery } from 'selectors'

const query = searchQuery('searchAdmins')
const admins = state => state.currentUser.admins

const filteredAdmins = createSelector(query, admins, (query, admins) =>
  admins.filter(c => {
    if (query !== '') {
      const re = new RegExp(query, 'i')
      return re.test(c.name) || re.test(c.email)
    }
    return true
  }),
)

const selector = createStructuredSelector({ admins: filteredAdmins })

export default compose(connect(selector))
