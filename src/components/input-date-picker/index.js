import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import DatePicker from 'material-ui/DatePicker'

const InputDate = ({ model, ...rest }) => (
  <Control
    component={DatePicker}
    controlProps={{
      onChange: (x, y) => console.log(x, y),
      ...rest,
    }}
    model={model}
  />
)

const InputDatePicker = ({ model, ...rest }) => (
  <InputDate model={model} onClick={e => console.log(e)} {...rest} />
)

InputDate.propTypes = {
  error: PropTypes.any,
  model: PropTypes.string.isRequired,
  touched: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
}

export default InputDatePicker
