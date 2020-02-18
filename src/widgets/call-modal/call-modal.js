import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import cx from 'classnames'
import 'moment-timezone'
import NotesForm from './notes-form'
import CallActions from './call-actions'
import CallRuntimeSettings from './call-runtime-settings'
import Title from './title'
import CallFromNumberForm from './call-from-number-form'
import PurchaseNumberButton from './purchase-number-button'
import CallInfo from './call-info'
import DialPad from './dial-pad'

const CallModal = props => {
  const {
    dialPadOpen,
    newCall,
    dialPadHistory,
    addDialPadHistory,
    connection,
  } = props
  if (!newCall) return null
  return (
    <Dialog
      actions={<CallActions {...props} />}
      actionsContainerClassName="call-modal-actions-container"
      bodyStyle={{ padding: '2rem 41px' }}
      className="call-modal"
      modal
      open
      title={<Title {...props} />}
      titleClassName="call-modal-title"
      titleStyle={{
        height: 110,
        fontSize: 24,
        borderBottom: '1px solid #eee',
        padding: '24px 41px 20px',
      }}
    >
      <div className={cx({ 'call-modal-content': true, hide: dialPadOpen })}>
        <CallInfo {...newCall} />
        <CallRuntimeSettings {...props} />
        <CallFromNumberForm {...props} />
        <PurchaseNumberButton {...props} />
        <NotesForm />
      </div>
      <DialPad
        dialPadOpen={dialPadOpen}
        dialPadHistory={dialPadHistory}
        addDialPadHistory={addDialPadHistory(connection)}
      />
    </Dialog>
  )
}

CallModal.propTypes = {
  addDialPadHistory: PropTypes.func.isRequired,
  dialPadHistory: PropTypes.string.isRequired,
  dialPadOpen: PropTypes.bool.isRequired,
  newCall: PropTypes.object,
}

export default CallModal
