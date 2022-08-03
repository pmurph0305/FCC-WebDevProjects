import React from 'react';

const TimeDisplay = ({timeMins, timeSecs}) => {
  
  const displayedTime = () => {
    return (timeMins < 10 ? "0"+timeMins : timeMins) + ":" + (timeSecs < 10 ? "0"+timeSecs : timeSecs);
  }

  return (
    <p id="time-left">
      {displayedTime()}
    </p>
  );
}

export default TimeDisplay;