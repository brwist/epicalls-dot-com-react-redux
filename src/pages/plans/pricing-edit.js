import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'components/input-text'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import styled from 'styled-components'
import { Form } from 'react-redux-form'
import ErrorBox from 'components/error-box'

const PricingEditModal = ({ open, close, submit }) => (
  <InfoBox
    open={open}
    onRequestClose={close}
    autoScrollBodyContent
    actions={[
      <DialogBoxButton
        key="cancel"
        label="cancel"
        onClick={close}
        style={{ borderRight: '1px solid #eee' }}
      />,
      <StyledDialogBoxButton
        form="edit-pricing-form"
        key="edit-pricing"
        label="save"
        type="submit"
      />,
    ]}
  >
    <h2>Edit Pricing</h2>
    <ErrorBox model="planEdit.commonErrors" show />
    <Form id="edit-pricing-form" model="planEdit" onSubmit={submit}>
      <InputText floatingLabelText="Amount" fullWidth model=".amount" />
      <p>Specify amount in cents please</p>
    </Form>
  </InfoBox>
)

PricingEditModal.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
}

const StyledDialogBoxButton = styled(DialogBoxButton)`
  > div {
    margin: 0 auto;
  }
`

export default PricingEditModal
