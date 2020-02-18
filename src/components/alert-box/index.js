import React from 'react'
import PropTypes from 'prop-types'
import DialogBox from 'components/dialog-box'
import DialogBoxButton from 'components/dialog-box/button'
import VectorIcon from 'vector-icon'
import styled from 'styled-components'

const AlertBox = ({ yesAction, children, onRequestClose, ...rest }) => (
  <DialogBox
    onRequestClose={onRequestClose}
    actions={[
      <DialogBoxButton
        key="no"
        label="no"
        onClick={onRequestClose}
        hoverColor="#eaeaea"
        style={{
          borderRight: '1px solid #cecece',
        }}
      />,
      <DialogBoxButton
        key="yes"
        label="yes"
        onClick={yesAction}
        hoverColor="#eaeaea"
      />,
    ]}
    {...rest}
  >
    <RedLine />
    <Content>
      <div>
        <VectorIcon name="tick" style={{ marginRight: 18 }} />
      </div>
      <Message>{children}</Message>
    </Content>
  </DialogBox>
)

const RedLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e13240;
`

const Content = styled.div`
  padding: 4rem 41px;
  border-bottom: 1px solid #cecece;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Message = styled.div`
  line-height: 1.35;
`

AlertBox.propTypes = {
  children: PropTypes.any,
  yesAction: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default AlertBox
