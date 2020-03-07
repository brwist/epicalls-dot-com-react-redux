import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'components/input-text'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import styled from 'styled-components'
import { Form } from 'react-redux-form'
import ErrorBox from 'components/error-box'

const EditManagerModal = ({ setManagerToEdit, saveManager, managerToEdit }) => (
  <InfoBox
    open={!!managerToEdit}
    onRequestClose={e => setManagerToEdit(null)}
    actions={[
      <DialogBoxButton
        key="cancel"
        label="cancel"
        onClick={e => setManagerToEdit(null)}
        style={{ borderRight: '1px solid #eee' }}
      />,
      <StyledDialogBoxButton
        form="edit-manager-form"
        key="edit-manager"
        label="save"
        type="submit"
      />,
    ]}
  >
    <h2>Edit Manager</h2>
    <ErrorBox model="manager.commonErrors" show />
    <Form id="edit-manager-form" model="manager" onSubmit={saveManager}>
      <InputText floatingLabelText="Name" fullWidth model=".name" />
    </Form>
  </InfoBox>
)

EditManagerModal.propTypes = {
  managerToEdit: PropTypes.any,
  saveManager: PropTypes.func.isRequired,
  setManagerToEdit: PropTypes.func.isRequired,
}

const StyledDialogBoxButton = styled(DialogBoxButton)`
  > div {
    margin: 0 auto;
  }
`

export default EditManagerModal
