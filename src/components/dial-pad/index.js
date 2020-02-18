import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dialog from 'material-ui/Dialog'
import smartify from './smartify'

const circle = require('assets/images/dial-pad-circle.png')

const DialPad = ({ callNumber, updateNumber, ...rest }) => {
  const numberClickHandler = e => {
    e.stopPropagation()
    const num = e.target.textContent
    if (num.length === 1 && /[0-9#+*]/.test(num)) updateNumber(callNumber + num)
  }
  return (
    <Dialog
      bodyStyle={{
        padding: 0,
        borderRadius: '5px',
        backgroundColor: 'transparent',
      }}
      className="dial-pad-dialog"
      contentStyle={{
        width: 240,
        maxWidth: 240,
        margin: '0 0 0 calc(100% - 580px)',
      }}
      overlayStyle={{
        opacity: 0,
      }}
      paperProps={{
        style: {
          borderRadius: '5px',
          backgroundColor: 'transparent',
        },
      }}
      {...rest}
    >
      <DialPadGrid onClick={numberClickHandler}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>*</div>
        <div>0</div>
        <div>#</div>
        <div className="dummy" />
        <div>+</div>
        <div className="dummy" />
      </DialPadGrid>
    </Dialog>
  )
}

const DialPadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 220px;
  padding: 20px 10px;
  border-radius: 5px;
  background-color: #3a3a3a;
  box-shadow: 13.6px 25.6px 40px 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 23px;
  font-weight: 300;
  text-align: center;
  > div {
    padding: 15px 0;
    &:not(.dummy) {
      cursor: pointer;
      &:hover {
        background-image: url(${circle});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50% 50%;
      }
    }
  }
`

DialPad.propTypes = {
  callNumber: PropTypes.string.isRequired,
  updateNumber: PropTypes.func.isRequired,
}

export default smartify(DialPad)
