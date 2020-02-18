import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'

const DialogBox = ({ children, open, ...rest }) => (
  <Dialog
    actionsContainerStyle={{
      padding: 0,
      display: 'flex',
    }}
    bodyStyle={{
      padding: '0',
      borderRadius: '5px',
    }}
    className="five-px-modal-border-radius"
    open={open}
    {...rest}
  >
    {children}
  </Dialog>
)

DialogBox.propTypes = {
  children: PropTypes.any,
  open: PropTypes.bool.isRequired,
}

export default DialogBox
