import React from 'react';
import './DrumPad.css';



class DrumPad extends React.Component {

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  // User Story #6: When I press the trigger key associated with each .drum-pad,
  // the audio clip contained in its child audio element should be triggered 
  //(e.g. pressing the Q key should trigger the drum pad which contains 
  //the string "Q", pressing the W key should trigger the drum pad which
  // contains the string "W", etc.).
  onKeyDown = (event) => {
    if (event.key.toUpperCase() === this.props.keyVal) {
      this.onClick();
    }
  }
  // User Story #5: When I click on a .drum-pad element, 
  //the audio clip contained in its child audio element should be triggered.
  onClick = () => {
    let audioElement = document.getElementById(this.props.keyVal);
    audioElement.play();
    this.props.onPlaySound(this.props.keyIndex);
  }

  render() {
  const {keyVal, audioDesc, fileName} = this.props;
  return (
    <button className="drum-pad" id={audioDesc} onClick={this.onClick}>
    {keyVal}
    {/*  Within each .drum-pad, there should be an HTML5 <audio> element which has a src attribute pointing to an audio clip, a class name of "clip", and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.). */}
      <audio className="clip" id={keyVal}  src={process.env.PUBLIC_URL +"/DrumSamples/"+fileName} type="audio/wav"/>
    </button>
  )
  }
}

export default DrumPad;