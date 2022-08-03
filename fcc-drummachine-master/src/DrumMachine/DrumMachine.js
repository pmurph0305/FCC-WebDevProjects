import React from 'react';

import DrumPad from '../DrumPad/DrumPad';

import './DrumMachine.css';

//  User Story #3: Within #drum-machine I can see 9 clickable drum pad elements, each with a class name of drum-pad,
//  a unique id that describes the audio clip the drum pad will be set up to trigger,
//  and an inner text that corresponds to one of the following keys on the keyboard: Q, W, E, A, S, D, Z, X, C. 
//  The drum pads MUST be in this order.
const DrumKeys = [
  {key: "Q", audioDesc: "Clap Clap", fileName:"Clap-clap.wav"},
  {key: "W", audioDesc: "Quarter Clap", fileName:"Quarter-clap.wav"},
  {key: "E", audioDesc: "Taxi Clap", fileName:"Taxi-clap.wav"},
  {key: "A", audioDesc: "Damn Hat", fileName:"Damn-hat.wav"},
  {key: "S", audioDesc: "Kraft Hat", fileName:"Kraft-hat.wav"},
  {key: "D", audioDesc: "Superb Hat", fileName:"Superb-hat.wav"},
  {key: "Z", audioDesc: "Dynamite Snare", fileName:"Dynamite-snare.wav"},
  {key: "X", audioDesc: "Lame Snare", fileName:"Lame-snare.wav"},
  {key: "C", audioDesc: "Hashbrown Kick", fileName:"Hashbrown-kick.wav"},
]

class DrumMachine extends React.Component {

  constructor(props) {
    super(props);
    // User Story #7: When a .drum-pad is triggered, a string describing the associated audio clip is displayed as
    // the inner text of the #display element (each string must be unique).
    this.state = {
      display: 'None'
    }
  }


  onPlaySound = (index) => {
    if (index < DrumKeys.length) {
      this.setState({display: DrumKeys[index].audioDesc})
    }
  }

  render() {
    return (
      // User Story #1: I should be able to see an outer container
      // with a corresponding id="drum-machine" that contains all other elements.
      <div className="drum-machine" id="drum-machine">
        <div className="drum-key-container">
          <div className="drum-key-grid">
            {DrumKeys.map((drum, index) => <DrumPad key={drum.key} keyVal={drum.key} audioDesc={drum.audioDesc} fileName={drum.fileName} onPlaySound={this.onPlaySound} keyIndex={index}/>)}
          </div>
        </div>
        <div className="drum-display-container">
        {/* User Story #2: Within #drum-machine I can see an element with a corresponding id="display". */}
          <label htmlFor="display" className="drum-display-label">Last Sound</label>
          <p className="drum-display" id="display">{this.state.display}</p>
        </div>
      </div>
    )
  }
}

export default DrumMachine;