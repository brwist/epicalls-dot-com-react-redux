import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VectorIcon from 'vector-icon'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import MyAccountLayout from 'layouts/my-account'
import Toggle from 'material-ui/Toggle'
import smartify from './smartify'

const MyAccount = ({
  currentUser,
  token,
  setAcceptAllIncomingCalls,
  setAcceptIncomingBrowserCalls,
}) => (
  <MyAccountLayout title="My Account">
    <div>
      <Content>
        <div>
          <dt>Name</dt>
          <dd>
            <Link to="/my-account/change-name">
              {currentUser.firstName} <VectorIcon name="edit" />
            </Link>
          </dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <Link to="/my-account/change-email">
              {currentUser.email} <VectorIcon name="edit" />
            </Link>
          </dd>
        </div>
        <div>
          <dt>Password</dt>
          <dd>
            <Link to="/my-account/change-password">
              ************* <VectorIcon name="edit" />
            </Link>
          </dd>
        </div>
        <div>
          <dt>Auth Token</dt>
          <dd>
            <TextField
              id="auth-token"
              value={token}
              onClick={e => e.target.select()}
              readOnly
              fullWidth
            />
          </dd>
        </div>
        {currentUser.pricing && (
          <div>
            <dt>Pricing</dt>
            <dd>{currentUser.pricing.name}</dd>
          </div>
        )}
      </Content>
      {typeof currentUser.acceptAllIncomingCalls !== 'undefined' && (
        <ToggleWrapper>
          <Toggle
            label="Only accept calls from numbers we've call in the past"
            onToggle={setAcceptAllIncomingCalls(
              !currentUser.acceptAllIncomingCalls,
            )}
            labelPosition="left"
            toggled={!currentUser.acceptAllIncomingCalls}
          />
        </ToggleWrapper>
      )}
      {typeof currentUser.acceptIncomingBrowserCalls !== 'undefined' && (
        <ToggleWrapper>
          <Toggle
            label="Accept browser incoming calls"
            onToggle={setAcceptIncomingBrowserCalls(
              !currentUser.acceptIncomingBrowserCalls,
            )}
            labelPosition="left"
            toggled={currentUser.acceptIncomingBrowserCalls}
          />
        </ToggleWrapper>
      )}
    </div>
  </MyAccountLayout>
)

const Content = styled.dl`
  > div {
    padding: 16px 0;
  }
  dt {
    font-weight: 300;
    display: inline-block;
    width: 80px;
  }
  dd {
    display: inline-block;
    a {
      text-decoration: none;
      color: #3c3d3f;
    }
    svg {
      margin-left: 8px;
      position: relative;
      top: 3px;
      visibility: hidden;
    }
    &:hover {
      svg {
        visibility: visible;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    dd {
      display: block;
      margin-left: 0;
    }
  }
`

const ToggleWrapper = styled.div`
  font-weight: 300;
  max-width: 290px;
`

MyAccount.propTypes = {
  currentUser: PropTypes.object.isRequired,
  setAcceptAllIncomingCalls: PropTypes.func.isRequired,
  setAcceptIncomingBrowserCalls: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default smartify(MyAccount)
