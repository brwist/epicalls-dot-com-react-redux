import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'components/input-text'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import styled from 'styled-components'
import { Form } from 'react-redux-form'
import ErrorBox from 'components/error-box'

const AddContactForm = ({ open, onRequestClose, addContact }) => (
  <InfoBox
    open={open}
    onRequestClose={onRequestClose}
    actions={[
      <DialogBoxButton
        key="cancel"
        label="cancel"
        onClick={onRequestClose}
        style={{ borderRight: '1px solid #eee' }}
      />,
      <StyledDialogBoxButton
        form="add-contact-form"
        key="add-contact"
        label="add"
        type="submit"
      />,
    ]}
  >
    <h2>Add Contact</h2>
    <ErrorBox model="contact.commonErrors" show />
    <Form id="add-contact-form" model="contact" onSubmit={addContact}>
      <InputText floatingLabelText="Name" fullWidth model=".name" />
      <InputText floatingLabelText="Number" fullWidth model=".number" />
      <InputText floatingLabelText="Email" fullWidth model=".email" />
    </Form>
  </InfoBox>
)

const StyledDialogBoxButton = styled(DialogBoxButton)`
  > div {
    margin: 0 auto;
  }
`

AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default AddContactForm
