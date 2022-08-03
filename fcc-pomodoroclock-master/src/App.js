import React from 'react';

import AdjustableTimes from './AdjustableLength/AdjustableTimes'
import Button from './Button/Button'
import TimeDisplay from './TimeDisplay/TimeDisplay'

import './App.css';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLabel: "Session",
  timeMins: 25,
  timeSecs: 0,
  timerIsRunning: false,
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.timerTimeout = null;
    this.audioBeep = React.createRef();
  }

  onSessionDecrement = () => {
    if (this.state.sessionLength > 1) {
      this.setState({ sessionLength: this.state.sessionLength-1, timeMins: this.state.sessionLength-1})
    }
  }

  onBreakDecrement = () => {
    if (this.state.breakLength > 1) {
      this.setState({ breakLength: this.state.breakLength-1})
    }
  }

  onSessionIncrement = () => {
    if (this.state.sessionLength < 60) {
      this.setState({ sessionLength: this.state.sessionLength+1, timeMins: this.state.sessionLength+1})
    }
  }

  onBreakIncrement = () => {
    if (this.state.breakLength < 60) {
      this.setState({ breakLength: this.state.breakLength+1})
    }
  }

  onStartStopClick = () => {
    if (this.state.timerIsRunning === false) {
      this.setState({timerIsRunning: true});
      this.timerTimeout = setTimeout(this.onUpdateTimer, 1000);
    } else {
      this.setState({timerIsRunning: false})
    }
  }



  onResetClick = () => {
    this.setState(initialState);
    if (this.audioBeep.current) {
        // User Story #28: The audio element with id of beep must stop playing 
  // and be rewound to the beginning when the element with the id of reset is clicked.
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime=0;
    }
  }
  
  onTimerFinished = () => {
    if (this.audioBeep.current) {
      this.audioBeep.current.play();
    }
    if(this.state.timeLabel === "Session") {
      this.setState({timeLabel: "Break", timeSecs: 0, timeMins: this.state.breakLength}, () => {
        this.timerTimeout = setTimeout(this.onUpdateTimer, 1000);
      });
    } else if (this.state.timeLabel === "Break") {
      this.setState({timeLabel: "Session", timeSecs: 0, timeMins: this.state.sessionLength}, () => {
        this.timerTimeout = setTimeout(this.onUpdateTimer, 1000);
      });
    }
  }

  onUpdateTimer = () => {
    if (this.state.timerIsRunning) {
      if (this.state.timeSecs === 0) {
        if (this.state.timeMins > 0) {
          this.setState({timeSecs: 59, timeMins: this.state.timeMins-1});
          this.timerTimeout = setTimeout(this.onUpdateTimer, 1000);
        } else {
          this.onTimerFinished();
        }
      } else {
        this.setState({timeSecs: this.state.timeSecs-1});
        this.timerTimeout = setTimeout(this.onUpdateTimer, 1000);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerTimeout);
    this.timerTimeout = null;
  }

  render() {
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="app-session-break-container">
          <AdjustableTimes 
            idLabel="break-label"
            label="Break Length"
            idButtonDown="break-decrement"
            idButtonUp="break-increment"
            idValue="break-length"
            value={this.state.breakLength}
            onDecrement={this.onBreakDecrement}
            onIncrement={this.onBreakIncrement}
          />
          <AdjustableTimes 
            idLabel="session-label"
            label="Session Length"
            idButtonDown="session-decrement"
            idButtonUp="session-increment"
            idValue="session-length"
            value={this.state.sessionLength}
            onDecrement={this.onSessionDecrement}
            onIncrement={this.onSessionIncrement}
          />
        </div>
        <div className="timer-container">
          <p className="timer-label" id="timer-label">{this.state.timeLabel}</p>
          <TimeDisplay timeMins={this.state.timeMins} timeSecs={this.state.timeSecs}/>
          <div className="timer-button-container">
            <Button buttonId="start_stop" onClick={this.onStartStopClick} faIconName={this.state.timerIsRunning ? "fa-pause" : "fa-play"}/>
            <Button buttonId="reset" onClick={this.onResetClick} faIconName="fa-step-backward"/>
          </div>
          {/* // User Story #27: The audio element with id="beep" 
          //must be 1 second or longer. */}
          <audio id="beep" ref={this.audioBeep} src={process.env.PUBLIC_URL +"/Sound/Beep.wav"} type="audio/wav"/>
        </div>
      </div>
    );
  }
}

export default App;
