import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './styles.css'

const ContactList = ({
  contacts,
  setCurrentContact,
  currentContact,
  showOnlyContactsWithMessages,
}) => {
  if (showOnlyContactsWithMessages) {
    contacts = contacts.filter(c => c.messagesCount > 0)
  }
  return (
    <div className="messages-contact-list">
      {contacts.map(contact => (
        <div
          className="messages-contact"
          key={contact.id}
          onClick={setCurrentContact(contact)}
        >
          <div
            className={cx({
              'messages-contact-name': true,
              active: currentContact && currentContact.id === contact.id,
            })}
          >
            {contact.name || contact.number}
            {contact.name &&
              contact.name !== contact.number && (
                <span className="messages-contact-number">
                  {' '}
                  ({contact.number})
                </span>
              )}
          </div>
          <div
            className={cx({
              'messages-contact-last-message': true,
              unread: contact.lastMessageUnread,
            })}
          >
            {contact.lastMessage}
          </div>
        </div>
      ))}
    </div>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  currentContact: PropTypes.object,
  setCurrentContact: PropTypes.func.isRequired,
  showOnlyContactsWithMessages: PropTypes.bool.isRequired,
}

export default ContactList
