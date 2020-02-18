import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete'
import { Control } from 'react-redux-form'

const InputText = ({ model, validators, ...rest }) => (
  <Control
    component={AutoComplete}
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
