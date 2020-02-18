import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Link } from 'react-router-dom'
import Layout from 'layouts/guest'
import styled from 'styled-components'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import LoginButton from 'components/login-button'
import smartify from './smartify'

const Login = ({ submit }) => (
  <Layout title="Login">
    <StyledForm model="login" onSubmit={submit}>
      <Register>Sign In</Register>
      <div>
        <InputText
          autoFocus
          floatingLabelText="Email"
          fullWidth
          model=".auth.email"
          required
        />
        <br />
        <InputText
          floatingLabelText="Password"
          fullWidth
          model=".auth.password"
          required
          type="password"
        />
      </div>
      <div>
        <ErrorBox model="login.commonErrors" show />
      </div>
      <div style={{ margin: '39px 0 38px' }}>
        <LoginButton text="SIGN IN" />
      </div>
      <BottomLinks>
        <Link to="/signup">Register</Link>
        <Link to="/reset-password">Reset password</Link>
      </BottomLinks>
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

const BottomLinks = styled.div`
  text-align: center;
  > a {
    display: inline-block;
    font-size: 12px;
    letter-spacing: 0.2px;
    color: #555759;
  }
  > a:first-child {
    margin-right: 10px;
  }
`

Login.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default smartify(Login)
