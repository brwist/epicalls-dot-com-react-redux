import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import VectorIcon from 'vector-icon'

const AddButton = ({ label, ...rest }) => (
  <FlatButton
    disableTouchRipple
    hoverColor="transparent"
    icon={<VectorIcon name="plus" />}
    label={
      <span>
        <b>Add</b>
        {label ? ` ${label}` : ''}
      </span>
    }
    labelStyle={{
      textTransform: 'none',
      fontWeight: 400,
      fontSize: 16,
    }}
    {...rest}
  />
)

AddButton.propTypes = {
  label: PropTypes.string,
}

export default AddButton
