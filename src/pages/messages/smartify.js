import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import connectForm from 'utils/connect-form'
import { actions } from 'react-redux-form'
import { createStructuredSelector } from 'reselect'
import {
  searchMessagesContacts,
  searchMessages,
  getUserContact,
} from 'selectors'
import api from 'api'
import { hangUpCall, clearMessages } from 'actions'

const selector = createStructuredSelector({
  contacts: searchMessagesContacts,
  messages: searchMessages,
  callInfo: state => state.callTo,
  getUserContact,
})

const mapDispatchToProps = (dispatch, props) => ({
  setContactId: id => dispatch(actions.change('message.message.contactId', id)),
  loadMessages: contactId => dispatch(api.actions.messages.get({ contactId })),
  loadContacts: () => dispatch(api.actions.contacts.get()),
  callTo: number => e => {
    e.stopPropagation()
    dispatch(api.actions.callTo.get(number))
  },
  hangUpCall: () => dispatch(hangUpCall()),
  clearMessages: () => dispatch(clearMessages()),
})

export default compose(
  connect(
    selector,
    mapDispatchToProps,
  ),
  withState('currentContact', 'setCurrentContact', null),
  withState(
    'showOnlyContactsWithMessages',
    'setShowOnlyContactsWithMessages',
    true,
  ),
  withHandlers({
    setCurrentContact: ({
      setCurrentContact,
      setContactId,
      loadMessages,
    }) => contact => _e => {
      setCurrentContact(contact)
      if (contact) {
        setContactId(contact.id)
        loadMessages(contact.id)
      }
    },
    toggleShowOnlyContactsWithMessages: ({
      setShowOnlyContactsWithMessages,
    }) => e => setShowOnlyContactsWithMessages(current => !current),
  }),
  connectForm({
    form: 'message',
    action: 'sendMessage',
    submitActionName: 'sendMessage',
    after: dispatch => dispatch(actions.reset('message.message.message')),
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadContacts()
      this.props.hangUpCall()
      const contact = this.props.getUserContact
      if (contact) {
        this.props.setCurrentContact(contact)()
      }
    },
    componentWillUnmount() {
      this.props.setCurrentContact(null)()
      this.props.clearMessages()
    },
  }),
)
