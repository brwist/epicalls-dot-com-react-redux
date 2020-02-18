import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'components/input-text'
import FlatButton from 'material-ui/FlatButton'
import { Form } from 'react-redux-form'
import { connect } from 'react-redux'
import ErrorBox from 'components/error-box'
import './styles.css'

const mapStateToProps = ({ message }) => ({
  message: message.message.message,
})

const NewMessageForm = ({ submit, currentContact, message }) => (
  <div className="messages-new">
    <Form model="message" onSubmit={submit} className="messages-new-form">
      <InputText
        fullWidth
        hintText={
          currentContact
            ? `Message to ${currentContact.name || currentContact.number}`
            : ''
        }
        model=".message.message"
      />
      <FlatButton
        disabled={!currentContact || message === ''}
        label="send"
        primary
        style={{ marginLeft: 24 }}
        type="submit"
      />
    </Form>
    <ErrorBox model="message.commonErrors" show />
  </div>
)

NewMessageForm.propTypes = {
  currentContact: PropTypes.object,
  message: PropTypes.string,
  submit: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(NewMessageForm)
