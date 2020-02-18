import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import 'moment-timezone'
import CallActions from './call-actions'
import Title from './title'
import CallInfo from './call-info'
import DialPad from './dial-pad'

const CallModal = ({
  open,
  dialPadOpen,
  dialPadHistory,
  addDialPadHistory,
  contact,
  ...rest
}) => (
  <Dialog
    actions={<CallActions contact={contact} {...rest} />}
    actionsContainerClassName="call-modal-actions-container"
    bodyStyle={{ padding: '2rem 41px' }}
    className="call-modal-incoming"
    modal
    open={open}
    title={<Title contact={contact} onAir={rest.onAir} />}
    titleClassName="call-modal-title"
    titleStyle={{
      height: 110,
      fontSize: 24,
      borderBottom: '1px solid #eee',
      padding: '24px 41px 20px',
    }}
  >
    <div className="call-modal-content">
      {dialPadOpen ? (
        <DialPad
          dialPadOpen={dialPadOpen}
          dialPadHistory={dialPadHistory}
          addDialPadHistory={addDialPadHistory}
        />
      ) : (
        <CallInfo {...contact} />
      )}
    </div>
  </Dialog>
)

CallModal.propTypes = {
  open: PropTypes.bool.isRequired,
  contact: PropTypes.object,
}

export default CallModal
