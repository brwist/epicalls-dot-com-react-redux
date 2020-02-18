import React from 'react'
import PropTypes from 'prop-types'
import SubMenu from 'components/sub-menu'
import ContactList from './contact-list'
import NewMessageForm from './new-message-form'
import MessageHistory from './message-history'
import SearchContactForm from './search-contact-form'
import ContactInfo from './contact-info'
import ContactListFilters from './contact-list-filters'
import smartify from './smartify'
import './styles.css'

const Messages = ({
  currentUser,
  match,
  contacts,
  messages,
  currentContact,
  setCurrentContact,
  sendMessage,
  callTo,
  callInfo,
  showOnlyContactsWithMessages,
  toggleShowOnlyContactsWithMessages,
}) => (
  <div>
    <SubMenu
      path={match.path}
      role={currentUser.role}
      unreadMessagesCount={currentUser.unreadMessagesCount}
    />
    <div className="shadow">
      <div className="messages">
        <SearchContactForm />
        <ContactInfo callTo={callTo} currentContact={currentContact} />
        <ContactList
          contacts={contacts}
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
          showOnlyContactsWithMessages={showOnlyContactsWithMessages}
        />
        <MessageHistory messages={messages} />
        <ContactListFilters
          showOnlyContactsWithMessages={showOnlyContactsWithMessages}
          toggleShowOnlyContactsWithMessages={
            toggleShowOnlyContactsWithMessages
          }
        />
        <NewMessageForm currentContact={currentContact} submit={sendMessage} />
      </div>
    </div>
  </div>
)

Messages.propTypes = {
  callInfo: PropTypes.object,
  callTo: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  currentContact: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  setCurrentContact: PropTypes.func.isRequired,
  showOnlyContactsWithMessages: PropTypes.bool.isRequired,
  toggleShowOnlyContactsWithMessages: PropTypes.func.isRequired,
}

export default smartify(Messages)
