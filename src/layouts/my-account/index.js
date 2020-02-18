import React from 'react'
import PropTypes from 'prop-types'
import GoBack from 'widgets/go-back'
import styled from 'styled-components'

const MyAccount = ({ children, title }) => (
  <div className="my-account">
    <GoBack />
    <div
      className="hide-on-mobile"
      style={{ height: '2rem', lineHeight: '1' }}
    />
    <div className="rounded-card">
      <div className="my-account-header">{title}</div>
      <Container>
        <Content>{children}</Content>
      </Container>
    </div>
  </div>
)

const Container = styled.div`
  padding: 30px 10%;
`

const Content = styled.div`
  padding: 16px 0;
`

MyAccount.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default MyAccount
