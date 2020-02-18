import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'
import { Control } from 'react-redux-form'

const InputCheckbox = ({ model, validators, ...rest }) => (
  <Control
    component={props => (
      <Checkbox
        checked={Boolean(props.value)}
        label={props.label}
        onCheck={(event, value) => {
          props.onChange(value)
        }}
      />
    )}
    controlProps={rest}
    model={model}
    validators={validators}
  />
)

InputCheckbox.propTypes = {
  messages: PropTypes.object,
  model: PropTypes.string.isRequired,
  validators: PropTypes.object,
}

export default InputCheckbox
