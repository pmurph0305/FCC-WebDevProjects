import React from 'react';

import './CalcButton.css';

const CalcButton = ({keyId, displayed, onClick}) => {
  return (
    <button className='calc-button' onClick={() => onClick(displayed)} id={keyId}>{displayed}</button>
  )
}

export default CalcButton;