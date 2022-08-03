import React from 'react';

import './Button.css'

const Button = ({buttonId, label, onClick, faIconName}) => {

  return (
    <button className="pomo-button" id={buttonId} onClick={onClick}>{label}<i className={"fa "+faIconName}></i></button>
  )

}

export default Button;