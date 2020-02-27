import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'components/input-text'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import styled from 'styled-components'
import { Form } from 'react-redux-form'
import ErrorBox from 'components/error-box'

const EditRepModal = ({ setRepToEdit, saveRep, repToEdit }) => (
  <InfoBox
    open={!!repToEdit}
    onRequestClose={e => setRepToEdit(null)}
    actions={[
      <DialogBoxButton
        key="cancel"
        label="cancel"
        onClick={e => setRepToEdit(null)}
        style={{ borderRight: '1px solid #eee' }}
      />,
      <StyledDialogBoxButton
        form="edit-rep-form"
        key="edit-rep"
        label="save"
        type="submit"
      />,
    ]}
  >
    <h2>Edit Rep</h2>
    <ErrorBox model="rep.commonErrors" show />
    <Form id="edit-rep-form" model="rep" onSubmit={saveRep}>
      <InputText floatingLabelText="Name" fullWidth model=".name" />
      <InputText floatingLabelText="Forwarding Number" fullWidth model=".number" />
      <InputText floatingLabelText="Email" fullWidth model=".email" />
    </Form>
  </InfoBox>
)

EditRepModal.propTypes = {
  repToEdit: PropTypes.any,
  saveRep: PropTypes.func.isRequired,
  setRepToEdit: PropTypes.func.isRequired,
}

const StyledDialogBoxButton = styled(DialogBoxButton)`
  > div {
    margin: 0 auto;
  }
`

export default EditRepModal
