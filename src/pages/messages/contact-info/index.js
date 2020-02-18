import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import VectorIcon from 'vector-icon'
import SearchForm from 'components/search-form'
import 'moment-timezone'
import './styles.css'

const ContactInfo = ({
  name,
  number,
  country,
  geoName,
  totalCalls,
  lastContacted,
  timezone,
  callTo,
}) => (
  <div className="messages-contact-info">
    <div className="contact-info-call-icon">
      <VectorIcon name="handsetOnGreen" onClick={callTo(number)} />
    </div>
    <div>
      <div className="contact-info-name">{name}</div>
      <div>{number}</div>
    </div>
    <div>
      <div>
        {country}, {geoName}
      </div>
      <div>Local time: {moment.tz(new Date(), timezone).format('h:mm A')}</div>
    </div>
    <div>
      <div>Total Calls: {totalCalls}</div>
      <div>
        Last Contacted:{' '}
        {lastContacted ? moment(lastContacted).fromNow() : 'never'}
      </div>
    </div>
    <div className="contact-info-search-message">
      <SearchForm
        className="messages-search-message"
        model="messagesSearchMessage"
      />
    </div>
  </div>
)

const ContactInfoWrapper = ({ currentContact, callTo }) => (
  <div className="messages-contact-info-wrapper">
    {currentContact && <ContactInfo {...currentContact} callTo={callTo} />}
  </div>
)

ContactInfoWrapper.propTypes = {
  callTo: PropTypes.func.isRequired,
  currentContact: PropTypes.object,
}

ContactInfo.propTypes = {
  callTo: PropTypes.func.isRequired,
  country: PropTypes.string,
  geoName: PropTypes.string,
  lastContacted: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  timezone: PropTypes.string,
  totalCalls: PropTypes.number,
}

export default ContactInfoWrapper
