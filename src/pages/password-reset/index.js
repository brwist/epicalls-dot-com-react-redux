import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import InputHidden from 'components/input-hidden'
import ErrorBox from 'components/error-box'
import styled from 'styled-components'
import LoginButton from 'components/login-button'
import Layout from 'layouts/guest'
import smartify from './smartify'

const PasswordReset = ({ form, submit }) => (
  <Layout title="Password Reset">
    <StyledForm model="passwordReset" onSubmit={submit}>
      <Register>Create new password</Register>
      <div>
        <InputHidden model=".email" />
        <InputHidden model=".id" />
        <InputText
          autoComplete="new-password"
          floatingLabelText="Password"
          fullWidth
          model=".user.password"
          required
          type="password"
        />
        <br />
        <InputText
          autoComplete="new-password"
          floatingLabelText="Confirm password"
          fullWidth
          model=".user.passwordConfirmation"
          required
          type="password"
        />
      </div>
      <div>
        <ErrorBox model="passwordReset.commonErrors" show />
      </div>
      <div style={{ margin: '39px 0 38px' }}>
        <LoginButton text="RESET PASSWORD" />
      </div>
      <div>
        <StyledLink to="/">Login</StyledLink>
      </div>
    </StyledForm>
  </Layout>
)

const StyledForm = styled(Form)`
  width: 80%;
  max-width: 310px;
  margin: 30px auto 57px auto;
`

const Register = styled.div`
  font-size: 32px;
  font-weight: 300;
  letter-spacing: -0.6px;
  text-align: center;
  color: #313334;
  margin: 33px 0 23px;
`

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  color: #555759;
`

PasswordReset.propTypes = {
  form: PropTypes.any,
  submit: PropTypes.func.isRequired,
}

export default smartify(PasswordReset)
