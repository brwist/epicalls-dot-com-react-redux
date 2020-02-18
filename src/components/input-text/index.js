import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { Control } from 'react-redux-form'

const InputText = ({ model, validators, ...rest }) => (
  <Control
    component={TextField}
    controlProps={rest}
    model={model}
    validators={validators}
  />
)

InputText.propTypes = {
  messages: PropTypes.object,
  model: PropTypes.string.isRequired,
  validators: PropTypes.object,
}

export default InputText
