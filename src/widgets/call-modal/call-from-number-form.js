import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

function localNumberToText(localNumber) {
  const { number, shared, local } = localNumber
  let sharedLocal = []
  if (shared) sharedLocal.push('shared')
  if (local) sharedLocal.push('local')
  sharedLocal = sharedLocal.join(', ')
  if (sharedLocal.length !== 0) return `${number} (${sharedLocal})`
  return number
}

const CallFromNumberFrom = ({
  newCall,
  localNumbers,
  selectCallFromNumber,
  callFromNumber,
  hasLocalNumber,
}) => (
  <div className="call-from-number-form">
    {localNumbers.length > 0 && (
      <SelectField
        floatingLabelFixed
        floatingLabelStyle={{
          fontSize: 20,
          color: 'rgba(0, 0, 0, .6)',
          fontWeight: 500,
        }}
        floatingLabelText="Call From"
        fullWidth
        onChange={selectCallFromNumber}
        value={callFromNumber || ''}
      >
        {localNumbers.map(localNumber => (
          <MenuItem
            key={localNumber.id}
            primaryText={localNumberToText(localNumber)}
            value={localNumber.number}
          />
        ))}
      </SelectField>
    )}
    {hasLocalNumber &&
      newCall.contact &&
      newCall.callApiNumber && (
        <div>
          Or call
          <div style={{ height: '.5rem' }} />
          {`${newCall.callApiNumber} + ${newCall.contact.id}`}
        </div>
      )}
  </div>
)

CallFromNumberFrom.propTypes = {
  newCall: PropTypes.object.isRequired,
  localNumbers: PropTypes.array.isRequired,
  selectCallFromNumber: PropTypes.func.isRequired,
  callFromNumber: PropTypes.any,
  hasLocalNumber: PropTypes.bool.isRequired,
}

export default CallFromNumberFrom
