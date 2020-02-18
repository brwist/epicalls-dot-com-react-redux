import React from 'react'
import PropTypes from 'prop-types'
import VectorIcon from 'vector-icon'
import FlatButton from 'material-ui/FlatButton'
import smartify from './smartify'

const GoBack = ({ goBack }) => (
  <FlatButton
    className="go-back-button"
    icon={<VectorIcon name="chevronLeft" />}
    label="Go Back"
    labelStyle={{ textTransform: 'none', fontSize: 15 }}
    onClick={goBack}
  />
)

GoBack.propTypes = {
  goBack: PropTypes.func.isRequired,
}

export default smartify(GoBack)
