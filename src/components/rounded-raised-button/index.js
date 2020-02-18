import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const RoundedRaisedButton = props => (
  <RaisedButton
    buttonStyle={{
      borderRadius: 26,
    }}
    labelStyle={{
      fontSize: 17,
      fontWeight: 400,
    }}
    overlayStyle={{
      borderRadius: 26,
    }}
    rippleStyle={{
      borderRadius: 26,
    }}
    style={{
      height: 53,
      borderRadius: 26,
    }}
    {...props}
  />
)

export default RoundedRaisedButton
