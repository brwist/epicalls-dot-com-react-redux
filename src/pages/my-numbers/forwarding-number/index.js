import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VectorIcon from 'vector-icon'
import AlertBox from 'components/alert-box'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import FlatButton from 'material-ui/FlatButton'
import DialogBoxButton from 'components/dialog-box/button'
import ErrorBox from 'components/error-box'
import Snackbar from 'material-ui/Snackbar'
import smartify from './smartify'

const ForwardingNumber = ({
  currentUser,
  validationCallModalOpen,
  makeValidationCall,
  checkValidationCode,
  setValidationCallModal,
  validationError,
  setValidationError,
  createCallApiNumber,
  callApi,
}) => (
  <div className="rounded-card">
    <div className="my-numbers-header">
      <div>My Outbound Number</div>
      <div className="my-numbers-header-help">
        Inbound calls to your purchase number will be forwarded to you outbound
        number
      </div>
    </div>
    <OutboundNumberWrapper>
      <NumberHelpText>
        <VectorIcon name="call" />
        <span>Outbound Number</span>
      </NumberHelpText>
      <OutboundNumber>{currentUser.number}</OutboundNumber>
      {!currentUser.forwardingNumber.confirmed && (
        <FlatButton
          label="Confirm by phone call"
          onClick={makeValidationCall}
          secondary
        />
      )}
    </OutboundNumberWrapper>
    <AlertBox
      open={validationCallModalOpen}
      onRequestClose={() => setValidationCallModal(false)}
      yesAction={() => false}
      actions={[
        <DialogBoxButton
          key="cancel"
          label="cancel"
          onClick={() => setValidationCallModal(false)}
          hoverColor="#eaeaea"
          style={{ borderRight: '1px solid #cecece' }}
        />,
        <DialogBoxButton
          form="validation-code-form"
          hoverColor="#eaeaea"
          key="send"
          label="send"
          type="submit"
        />,
      ]}
    >
      <b>We are calling you now...</b>
      <br />
      Please provide your code
      <Form
        id="validation-code-form"
        model="validationCode"
        onSubmit={checkValidationCode}
      >
        <InputText model=".code" required style={{ width: 216 }} />
      </Form>
      <ErrorBox model="validationCode.commonErrors" show />
    </AlertBox>
    {validationError && (
      <Snackbar
        autoHideDuration={10000}
        contentStyle={{
          color: 'rgb(255, 64, 129)',
        }}
        message={validationError}
        onRequestClose={() => setValidationError(null)}
        open={!!validationError}
      />
    )}
  </div>
)

ForwardingNumber.propTypes = {
  callApi: PropTypes.func.isRequired,
  checkValidationCode: PropTypes.func.isRequired,
  createCallApiNumber: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  makeValidationCall: PropTypes.func.isRequired,
  setValidationCallModal: PropTypes.func.isRequired,
  setValidationError: PropTypes.func.isRequired,
  validationCallModalOpen: PropTypes.bool.isRequired,
  validationError: PropTypes.any,
}

const OutboundNumber = styled.span`
  font-size: 20px;
  letter-spacing: 0.8px;
  color: #5cbece;
  display: inline-block;
  margin-right: 16px;
`

const OutboundNumberWrapper = styled.div`
  padding: 1.5rem 30px;
`

const NumberHelpText = styled.div`
  color: #a1a1a1;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  > svg {
    margin-right: 8px;
  }
`

export default smartify(ForwardingNumber)
