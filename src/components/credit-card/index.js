import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VectorIcon from 'vector-icon'
import AlertBox from 'components/alert-box'
import moment from 'moment'
import smartify from './smartify'

const CreditCard = ({
  last4,
  expMonth,
  expYear,
  brand,
  modalOpen,
  openModal,
  closeModal,
  removeCard,
  updatedAt,
}) => (
  <StyledCreditCard>
    <div style={{ textAlign: 'right', padding: '13px 13px 0 0' }}>
      <StyledIcon name="trashed2x" onClick={openModal} />
    </div>
    <div style={{ padding: '0 28px 28px 28px' }}>
      <div style={{ fontSize: 18, marginBottom: 16 }}>{brand}</div>
      <div style={{ fontSize: 20, letterSpacing: '0.5px' }}>
        XXXX-XXXX-XXXX-
        {last4}
      </div>
      <div style={{ marginTop: 26, fontSize: 12 }}>
        <div>
          EXPIRES{' '}
          <span
            style={{ display: 'inline-block', marginLeft: 26, fontWeight: 200 }}
          >
            {expMonth}/{expYear}
          </span>
        </div>
        <div>
          ADDED{' '}
          <span
            style={{ display: 'inline-block', marginLeft: 35, fontWeight: 200 }}
          >
            {moment(updatedAt).format('MM/DD/YYYY')}
          </span>
        </div>
      </div>
      <AlertBox
        open={modalOpen}
        yesAction={() => {
          removeCard()
          closeModal()
        }}
        onRequestClose={closeModal}
      >
        Are you sure you want to delete your card?
      </AlertBox>
    </div>
  </StyledCreditCard>
)

CreditCard.propTypes = {
  brand: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  expMonth: PropTypes.number.isRequired,
  expYear: PropTypes.number.isRequired,
  last4: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

const StyledCreditCard = styled.div`
  margin: 2rem auto;
  color: #fff;
  width: 287px;
  height: 177px;
  border-radius: 5px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.08)
    ),
    linear-gradient(220deg, #ef2929, #ff7c00 51%, #fff600);
`

const StyledIcon = styled(VectorIcon)`
  cursor: pointer;
  > path {
    fill: #fff;
    opacity: 1;
  }
`

export default smartify(CreditCard)
