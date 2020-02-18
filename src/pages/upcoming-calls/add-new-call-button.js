import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import VectorIcon from 'vector-icon'

const AddNewCallButton = ({ onClick }) => (
  <FlatButton
    disableTouchRipple
    hoverColor="transparent"
    icon={<VectorIcon name="plus" />}
    label={
      <span>
        <b>Add</b>
      </span>
    }
    labelStyle={{
      textTransform: 'none',
      fontWeight: 400,
      fontSize: 16,
    }}
    onClick={onClick}
  />
)

AddNewCallButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default AddNewCallButton
