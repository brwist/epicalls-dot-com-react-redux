import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const circle = require('assets/images/dial-pad-circle.png')

const DialPadBox = ({ handleClick, ...rest }) => {
  const numberClickHandler = e => {
    e.stopPropagation()
    const num = e.target.textContent
    if (num.length === 1 && /[0-9#+*]/.test(num)) handleClick(num)
  }
  return (
    <DialPadGrid onClick={numberClickHandler} {...rest}>
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
  )
}

const DialPadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 220px;
  padding: 20px 10px;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
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
        color: #fff;
      }
    }
  }
`

DialPadBox.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default DialPadBox
