import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import VectorIcon from 'vector-icon'
import RoundedRaisedButton from 'components/rounded-raised-button'
import smartify from './smartify'

const AddARep = ({ submit }) => (
  <div className="addWidget">
    <h2 className="hide-on-mobile">
      <span className="bolder">Add</span> A Rep
    </h2>
    <Form model="rep" onSubmit={submit}>
      <InputText
        fullWidth
        hintText={
          <span>
            <UserIcon
              name="user"
              style={{ position: 'relative', marginRight: 8, marginLeft: 4 }}
            />
            Full Name
          </span>
        }
        model=".rep.firstName"
        required
      />
      <br />
      <InputText
        fullWidth
        hintText={
          <span>
            <VectorIcon
              name="envelope"
              style={{ position: 'relative', marginRight: 8, marginLeft: 4 }}
            />
            Email
          </span>
        }
        model=".rep.email"
        required
      />
      <br />
      <InputText
        fullWidth
        hintText={
          <span>
            <VectorIcon
              name="phone"
              style={{ position: 'relative', marginRight: 8, marginLeft: 4 }}
            />
            Forwarding number
          </span>
        }
        model=".rep.forwardingNumberAttributes.number"
      />
      <div>
        <ErrorBox model="rep.commonErrors" show />
      </div>
      <div style={{ height: 30 }} />
      <RoundedRaisedButton
        fullWidth
        label="Send Invite"
        primary
        type="submit"
      />
    </Form>
  </div>
)

const UserIcon = styled(VectorIcon)`
  > path {
    fill: #000;
    opacity: 0.4;
  }
`

AddARep.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default smartify(AddARep)
