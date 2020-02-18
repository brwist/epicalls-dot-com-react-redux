import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'components/input-text'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import styled from 'styled-components'
import { Form } from 'react-redux-form'
import ErrorBox from 'components/error-box'

const EditContactModal = ({ setContactToEdit, saveContact, contactToEdit }) => (
  <InfoBox
    open={!!contactToEdit}
    onRequestClose={e => setContactToEdit(null)}
    actions={[
      <DialogBoxButton
        key="cancel"
        label="cancel"
        onClick={e => setContactToEdit(null)}
        style={{ borderRight: '1px solid #eee' }}
      />,
      <StyledDialogBoxButton
        form="edit-contact-form"
        key="edit-contact"
        label="save"
        type="submit"
      />,
    ]}
  >
    <h2>Edit Contact</h2>
    <ErrorBox model="contact.commonErrors" show />
    <Form id="edit-contact-form" model="contact" onSubmit={saveContact}>
      <InputText floatingLabelText="Name" fullWidth model=".name" />
      <InputText floatingLabelText="Number" fullWidth model=".number" />
      <InputText floatingLabelText="Email" fullWidth model=".email" />
    </Form>
  </InfoBox>
)

EditContactModal.propTypes = {
  contactToEdit: PropTypes.any,
  saveContact: PropTypes.func.isRequired,
  setContactToEdit: PropTypes.func.isRequired,
}

const StyledDialogBoxButton = styled(DialogBoxButton)`
  > div {
    margin: 0 auto;
  }
`

export default EditContactModal
