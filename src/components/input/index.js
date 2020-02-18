import React from 'react'
import PropTypes from 'prop-types'
import { Control, Errors } from 'react-redux-form'
import styled from 'styled-components'
import cx from 'classnames'
import CustomInput from './custom-input'

const Input = ({
  type = 'text',
  model,
  white,
  validators,
  className,
  ...rest
}) => (
  <Container className={className}>
    <Control
      className={cx('input', {
        'input--default': !white,
        'input--white': white,
      })}
      component={CustomInput}
      controlProps={rest}
      mapProps={{
        reset: props => e => {
          props.onChange('')
          e.preventDefault()
        },
      }}
      model={model}
      type={type}
      validators={validators}
      white={white}
    />
    <Errors
      component="li"
      messages={{
        required: 'Это поле обязательное',
        isEmail: 'Введите корректный e-mail',
      }}
      model={model}
      show={field => field.submitFailed}
      wrapper={ErrorsList}
    />
  </Container>
)

const Container = styled.div`
  margin-bottom: 20px;
`

const ErrorsList = styled.ul`
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 10px;
  color: #ab3232;
  display: block;
  list-style: none;
  padding: 0;
`

Input.propTypes = {
  className: PropTypes.string,
  controlType: PropTypes.string,
  model: PropTypes.string.isRequired,
  type: PropTypes.string,
  validators: PropTypes.object,
  white: PropTypes.bool,
}

export default Input
