import React from 'react';
import PropTypes from 'prop-types';

import './AdjustableTimes.css'

const AdjustableTimes = ({idValue, value, idLabel, label, idButtonDown, idButtonUp, onDecrement, onIncrement}) => {

  return(
    <div className="adjustable-times-container">
      <label className="adjustable-times-label" htmlFor={idButtonDown} id={idLabel}>{label}</label>
      <div className="adjustable-times-buttons-container">
        <button className="adjustable-times-button" id={idButtonUp} onClick={onIncrement}><i className="fa fa-arrow-up"></i></button>
        <p className="adjustable-times-value" id={idValue}>{value}</p>
        <button className="adjustable-times-button" id={idButtonDown} onClick={onDecrement}><i className="fa fa-arrow-down"></i></button>
      </div>
    </div>
  );

}

AdjustableTimes.propTypes = {
  idButtonDown: PropTypes.string,
  idButtonUp: PropTypes.string,
  idLabel: PropTypes.string,
  label: PropTypes.string,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
}

export default AdjustableTimes;