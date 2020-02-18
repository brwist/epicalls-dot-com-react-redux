import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VectorIcon from 'vector-icon'
import AlertBox from 'components/alert-box'
import smartify from './smartify'

const PurchasedNumbers = ({
  currentUser,
  allLocalNumbers,
  setNumberToRemove,
  toggleRemoveNumberModal,
  numberToRemove,
  removeNumber,
  removeNumberModalOpen,
}) => (
  <div className="rounded-card">
    <div className="my-numbers-header">
      <div>My Purchased Numbers</div>
    </div>
    <div className="my-purchased-numbers">
      {allLocalNumbers.map(localNumber => (
        <div
          key={localNumber.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1.5rem 30px',
            borderBottom: '1px solid #fafafa',
          }}
        >
          <div className="my-purchased-numbers-location-number">
            <div>
              <NumberHelpText>
                <VectorIcon name="pin" />
                <span>Location</span>
              </NumberHelpText>
              <NumberLocation>
                {`${localNumber.country}, ${localNumber.geoName}`}
              </NumberLocation>
            </div>
            <div>
              <NumberHelpText>
                <VectorIcon name="call" />
                <span>Purchased Number</span>
              </NumberHelpText>
              <PurchasedNumber>{localNumber.number}</PurchasedNumber>
            </div>
          </div>
          <div style={{ width: 30, textAlign: 'center' }}>
            <VectorIcon
              name="trash"
              style={{ cursor: 'pointer' }}
              onClick={e => {
                setNumberToRemove(localNumber)
                toggleRemoveNumberModal()
              }}
            />
          </div>
        </div>
      ))}
    </div>
    <AlertBox
      open={removeNumberModalOpen}
      onRequestClose={toggleRemoveNumberModal}
      yesAction={removeNumber(numberToRemove.id)}
    >
      Remove number <b>{numberToRemove.number}</b> ?
    </AlertBox>
  </div>
)

PurchasedNumbers.propTypes = {
  allLocalNumbers: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  numberToRemove: PropTypes.object.isRequired,
  removeNumber: PropTypes.func.isRequired,
  removeNumberModalOpen: PropTypes.bool.isRequired,
  setNumberToRemove: PropTypes.func.isRequired,
  toggleRemoveNumberModal: PropTypes.func.isRequired,
}

const NumberLocation = styled.div`
  font-size: 18px;
  color: #555759;
  line-height: 24px;
  padding: 0.5rem 0;
`

const NumberHelpText = styled.div`
  color: #a1a1a1;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.5;
  > svg {
    margin-right: 8px;
  }
`

const PurchasedNumber = styled.div`
  font-size: 20px;
  letter-spacing: 0.8px;
  color: #5cbece;
  line-height: 24px;
  padding: 0.5rem 0;
`

export default smartify(PurchasedNumbers)
