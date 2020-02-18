import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'material-ui/Toggle'
import './styles.css'

const ContactListFilters = ({
  showOnlyContactsWithMessages,
  toggleShowOnlyContactsWithMessages,
}) => (
  <div className="contact-list-filters">
    <Toggle
      label="Show only contacts I've texted before"
      onToggle={toggleShowOnlyContactsWithMessages}
      toggled={showOnlyContactsWithMessages}
      labelPosition="left"
    />
  </div>
)

ContactListFilters.propTypes = {
  showOnlyContactsWithMessages: PropTypes.bool.isRequired,
  toggleShowOnlyContactsWithMessages: PropTypes.func.isRequired,
}

export default ContactListFilters
