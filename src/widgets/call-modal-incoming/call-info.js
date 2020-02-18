import React from 'react'
import PropTypes from 'prop-types'
import VectorIcon from 'vector-icon'
import moment from 'moment'
import 'moment-timezone'
import CountryFlag from 'components/country-flag'

const CallInfo = ({
  geoName,
  country,
  numberTimezone,
  numberOfCalls = 0,
  lastContacted,
}) => (
  <React.Fragment>
    <div>
      <VectorIcon name="pin" style={{ position: 'relative', top: 2 }} />
      <span style={{ margin: '0 8px' }}>
        {geoName}, {country}
      </span>
      {country && (
        <CountryFlag
          country={country}
          style={{ position: 'relative', top: 2 }}
        />
      )}
    </div>
    <div className="hide-on-mobile">Number of Calls</div>
    <div className="hide-on-mobile">Last Contacted</div>
    <div>
      <div style={{ marginTop: 4 }}>
        <span style={{ color: '#a1a1a1', fontSize: 14 }}>Local Time:</span>{' '}
        {moment.tz(new Date(), numberTimezone).format('h:mm A')}
      </div>
    </div>
    <div className="hide-on-mobile">
      <div style={{ fontSize: 24, fontWeight: 'normal' }}>
        {`${numberOfCalls} Call${numberOfCalls !== 1 ? 's' : ''}`}
      </div>
    </div>
    <div className="hide-on-mobile">
      <div style={{ fontSize: 24, fontWeight: 'normal' }}>
        {lastContacted
          ? `${moment(new Date(lastContacted)).fromNow()}`
          : 'Never'}
      </div>
    </div>
  </React.Fragment>
)

CallInfo.propTypes = {
  geoName: PropTypes.string,
  country: PropTypes.string,
  numberTimezone: PropTypes.string,
  numberOfCalls: PropTypes.number,
  lastContacted: PropTypes.string,
}

export default CallInfo
