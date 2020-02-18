import React from 'react'
import PropTypes from 'prop-types'
import DialogBox from 'components/dialog-box'
import DialogBoxButton from 'components/dialog-box/button'
import styled from 'styled-components'

const NotifyBox = ({ children, onRequestClose, ...rest }) => (
  <DialogBox
    onRequestClose={onRequestClose}
    actions={[
      <DialogBoxButton
        key="ok"
        label="ok"
        onClick={onRequestClose}
        hoverColor="#eaeaea"
      />,
    ]}
    overlayStyle={{
      opacity: 0,
    }}
    {...rest}
  >
    <GreenLine />
    <Content>
      <div>{children}</div>
    </Content>
  </DialogBox>
)

const GreenLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: #43a047;
`

const Content = styled.div`
  padding: 4rem 41px;
  border-bottom: 1px solid #cecece;
  display: flex;
  align-items: center;
  justify-content: center;
`

NotifyBox.propTypes = {
  children: PropTypes.any,
  onRequestClose: PropTypes.func.isRequired,
}

export default NotifyBox
