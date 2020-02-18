import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import styled from 'styled-components'

const InfoBox = ({ open, children, ...rest }) => (
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
    title={<GradientLine />}
    titleStyle={{ margin: 0, padding: 0 }}
    {...rest}
  >
    <DialogBody>{children}</DialogBody>
  </Dialog>
)

const DialogBody = styled.div`
  padding: 2rem 41px;
  border-bottom: 1px solid #eee;
`

const GradientLine = styled.div`
  width: 100%;
  height: 5px;
  background-image: linear-gradient(225deg, #56c2cd, #83a4d5);
  border-radius: 5px 5px 0 0;
`

InfoBox.propTypes = {
  children: PropTypes.any,
  open: PropTypes.bool.isRequired,
}

export default InfoBox
