import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { actions } from 'react-redux-form'
import api from 'api'
import { compose } from 'redux'
import { withState, lifecycle } from 'recompose'
import { searchQuery } from 'selectors'
import standardErrorHandling from 'utils/standard-error-handling'

const query = searchQuery('searchContacts')
const contacts = state => state.contacts.results

const filteredContacts = createSelector(query, contacts, (query, contacts) =>
  contacts.filter(c => {
    if (query !== '') {
      const re = new RegExp(query, 'i')
      return re.test(c.number) || re.test(c.name) || re.test(c.email)
    }
    return true
  }),
)

const contactsByAlphabet = createSelector(filteredContacts, contacts =>
  contacts.reduce((arr, item) => {
    const firstLetter = (item.name || '-').charAt(0).toLowerCase()
    arr[firstLetter] = arr[firstLetter] || []
    arr[firstLetter].push(item)
    return arr
  }, {}),
)

const selector = createStructuredSelector({
  contactsParserError: state => {
    const error = state.forms.importContacts.commonErrors.$form.errors
    if (typeof error === 'string') return error
    return null
  },
  contactsByAlphabet,
  importContactsDialogOpen: state =>
    Object.keys(state.importContacts.contacts).length > 0,
})

const mapDispatchToProps = (dispatch, props) => ({
  callTo: contact => e => {
    e.stopPropagation()
    dispatch(actions.change('call.number', contact.number))
    dispatch(actions.submit('call'))
  },
  load: () => {
    dispatch(api.actions.contacts.get())
  },
  removeContact: () => {
    dispatch(api.actions.removeContact(props.contactToRemove.id))
    .then(_ => props.setContactToRemove(null))
    .then(_ => dispatch(api.actions.contacts.get()))
  },
  parseContactsFile: file => {
    const request = dispatch(api.actions.parseContactsFile(file))
      .then(contacts =>
        dispatch(actions.change('importContacts.contacts', contacts)),
      )
      .catch(standardErrorHandling)
    dispatch(actions.submit('importContacts', request, { fields: true }))
  },
  resetImportContactsForm: () => dispatch(actions.reset('importContacts')),
  setContactToEditForm: contact => {
    let { id, name, number, email } = contact
    email = email || ''
    name = name || ''
    dispatch(actions.change('contact', { id, name, number, email }))
    props.setContactToEdit(contact)
  },
  resetContactForm: e => dispatch(actions.reset('contact')),
  saveContact: model => {
    const request = dispatch(api.actions.updateContact(model.id, model))
      .then(_ => dispatch(actions.reset('contact')))
      .then(_ => props.setContactToEdit(null))
      .catch(standardErrorHandling)
    dispatch(actions.submit('contact', request, { fields: true }))
  },
  addContact: model => {
    const request = dispatch(api.actions.addContact(model))
      .then(_ => dispatch(api.actions.currentUser.get()))
      .then(_ => dispatch(actions.reset('contact')))
      .then(_ => props.setAddContactOpen(false))
      .then(_ => dispatch(api.actions.contacts.get()))
      .catch(standardErrorHandling)
    dispatch(actions.submit('contact', request, { fields: true }))
  },
})

export default compose(
  withState('addContactOpen', 'setAddContactOpen', false),
  withState('contactToRemove', 'setContactToRemove', null),
  withState('contactToEdit', 'setContactToEdit', null),
  withState('importContactsDialogOpen', 'setImportContactsDialogState', false),
  connect(
    selector,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.load()
    },
  }),
)
