import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import { Control } from 'react-redux-form'

const InputSelect = ({ model, afterChange, ...rest }) => (
  <Control
    component={props => (
      <SelectField
        errorText={props.touched && props.error}
        value={props.value}
        {...props}
        onChange={(event, index, value) => {
          props.onChange(value)
          afterChange && afterChange(value)
        }}
      >
        {rest.children}
      </SelectField>
    )}
    controlProps={rest}
    model={model}
  />
)

InputSelect.propTypes = {
  afterChange: PropTypes.any,
  error: PropTypes.any,
  model: PropTypes.string.isRequired,
  touched: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
}

export default InputSelect
