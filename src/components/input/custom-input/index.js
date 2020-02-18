import React from 'react'
import PropTypes from 'prop-types'
import Cleave from 'cleave.js/react'
import styled from 'styled-components'

const DefaultInput = props => <input {...props} />

const controlTypes = {
  default: DefaultInput,
  cleave: Cleave,
}

const CustomInput = ({
  value,
  reset,
  controlType = 'default',
  white,
  ...rest
}) => (
  <Container>
    {React.createElement(controlTypes[controlType], {
      value,
      ...rest,
    })}
  </Container>
)

const Container = styled.div`
  position: relative;
`

CustomInput.propTypes = {
  controlType: PropTypes.string,
  reset: PropTypes.func.isRequired,
  value: PropTypes.any,
  white: PropTypes.any,
}

export default CustomInput
