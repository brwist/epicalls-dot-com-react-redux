import React from 'react'
import InputText from 'components/input-text'
import { Form } from 'react-redux-form'

const NotesForm = () => (
  <div className="notes-form">
    <Form id="call-modal-form" model="call" style={{ width: '100%' }}>
      <InputText
        floatingLabelFixed
        floatingLabelText="Note"
        fullWidth
        inputStyle={{ fontWeight: 300, fontSize: 13 }}
        model=".notes"
        multiLine
        rows={4}
      />
    </Form>
  </div>
)

export default NotesForm
