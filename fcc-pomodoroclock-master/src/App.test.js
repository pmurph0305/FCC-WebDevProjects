import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {shallow, mount} from 'enzyme';

describe('App tests', () => {
  let wrapper;
  let mounted;
  beforeEach(() => {
    wrapper = shallow(<App/>);
    mounted = mount(<App/>);
    // override audio element functions.
    window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // User Story #1: I can see an element with id="break-label" that contains a string (e.g. "Break Length").
  it ('Can see element with id="break-label" that contains the string "Break Length"', () => {
    expect(mounted.find('#break-label').text()).toEqual("Break Length");
  })

  // User Story #2: I can see an element with id="session-label" that contains a string (e.g. "Session Length").
  it ('Can see an element with id="session-label" that contains the string "Session Length"', () => {
    expect(mounted.find('#session-label').text()).toEqual("Session Length");
  })

  // User Story #3: I can see two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement".
  it('Can see two elements with corresponding IDs: id="break-decrement" and id="session-decrement"', () => {
    expect(mounted.find('#break-decrement').length).toEqual(1);
    expect(mounted.find('#session-decrement').length).toEqual(1);
  })

  // User Story #4: I can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment".
  it('Can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment"', () => {
    expect(mounted.find('#break-increment').length).toEqual(1);
    expect(mounted.find('#session-increment').length).toEqual(1);
  })

  //User Story #5: I can see an element with a corresponding id="break-length", which by default (on load) displays a value of 5.
  it('Can see an element with a corresponding id="break-length", which by default (on load) displays a value of 5', () => {
    expect(mounted.find("#break-length").text()).toEqual("5");
  })

  // User Story #6: I can see an element with a corresponding id="session-length", which by default displays a value of 25.

  it('Can see an element with a corresponding id="session-length", which by default displays a value of 25', () => {
    expect(mounted.find("#session-length").text()).toEqual("25");
  })

  // User Story #7: I can see an element with a corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session").
  it('Can see an element with a corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session").', () => {
    expect(wrapper.find("#timer-label").text()).toEqual("Session");
  });

  //User Story #8: I can see an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00).
  it('Can see an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00).', () => {
    expect(mounted.find("#time-left").text()).toEqual("25:00");
  })

  // User Story #9: I can see a clickable element with a corresponding id="start_stop".
  it('Can see a clickable element with a corresponding id="start_stop".', () => {
    expect(mounted.find("#start_stop").length).toEqual(1);
  })

  // User Story #10: I can see a clickable element with a corresponding id="reset".
  it('Can see a clickable element with a corresponding id="reset".', () => {
    expect(mounted.find("#reset").length).toEqual(1);
  })

  // User Story #11: When I click the element with the id of reset, 
  //any running timer should be stopped, 
  //the value within id="break-length" should return to 5, 
  //the value within id="session-length" should return to 25, 
  //and the element with id="time-left"
  // should reset to it's default state
  it('Should reset values when reset button is clicked', () => {
    mounted.setState({breakLength: 10, sessionLength: 10})
    expect(mounted.state('breakLength')).toEqual(10);
    expect(mounted.state('sessionLength')).toEqual(10);

    mounted.find("#reset").simulate("click");
    expect(mounted.state('breakLength')).toEqual(5);
    expect(mounted.state('sessionLength')).toEqual(25);
    //the value within id="break-length" should return to 5
    expect(mounted.find("#break-length").text()).toEqual("5");
    //the value within id="session-length" should return to 25,
    expect(mounted.find("#session-length").text()).toEqual("25"); 
    //the element with id="time-left" should reset to it's default state.
    expect(mounted.find("#time-left").text()).toEqual("25:00");
  })

  //User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1, and I can see the updated value.
  it("Decrements breaklength when break-decrement is clicked, and you can see the updated value", () => {
    mounted.setState({breakLength: 10})
    mounted.find("#break-decrement").simulate('click');
    expect(mounted.state('breakLength')).toEqual(9);
    expect(mounted.find("#break-length").text()).toEqual("9"); 
  })

  //User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1, and I can see the updated value.
  it("Increments breaklength when break-increment is clicked, and you can see the updated value", () => {
    mounted.setState({breakLength: 10})
    mounted.find("#break-increment").simulate('click');
    expect(mounted.state('breakLength')).toEqual(11);
    expect(mounted.find("#break-length").text()).toEqual("11"); 
  })

  //User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1, and I can see the updated value.
  it("Decrements sessionlength when session-decrement is clicked, and you can see the updated value", () => {
    mounted.setState({sessionLength: 13})
    mounted.find("#session-decrement").simulate('click');
    expect(mounted.state('sessionLength')).toEqual(12);
    expect(mounted.find("#session-length").text()).toEqual("12");
  })

  //User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1, and I can see the updated value.
  it("Increments sessionlength when session-increment is clicked, and you can see the updated value", () => {
    mounted.setState({sessionLength: 13})
    mounted.find("#session-increment").simulate('click');
    expect(mounted.state('sessionLength')).toEqual(14);
    expect(mounted.find("#session-length").text()).toEqual("14");
  })

  //User Story #16: I should not be able to set a session or break length to <= 0.
  it("Should not decrement session or break length to less than 1", () => {
    mounted.setState({breakLength: 1, sessionLength: 1})
    mounted.find("#session-decrement").simulate('click');
    mounted.find("#break-decrement").simulate('click');
    expect(mounted.state('sessionLength')).toEqual(1);
    expect(mounted.state('breakLength')).toEqual(1);
  })

  //User Story #17: I should not be able to set a session or break length to > 60.
  it("Should not decrement session or break length to greater than 60", () => {
    mounted.setState({breakLength: 60, sessionLength: 60})
    mounted.find("#session-increment").simulate('click');
    mounted.find("#break-increment").simulate('click');
    expect(mounted.state('sessionLength')).toEqual(60);
    expect(mounted.state('breakLength')).toEqual(60);
  })

  //User Story #18: When I first click the element
  // with id="start_stop", the timer should begin
  // running from the value currently displayed in
  // id="session-length", even if the value has
  // been incremented or decremented from the original value of 25.
  it("Should correctly start the timer at the current session-length value when start_stop is clicked", () => {
    mounted.setState({ sessionLength: 25, timeMins: 25 });
    mounted.find("#session-increment").simulate('click');
    mounted.find("#session-increment").simulate('click');
    expect(mounted.find("#time-left").text()).toEqual("27:00");
  })

  // User Story #19: If the timer is running, the element with the id of
  // time-left should display the remaining time in mm:ss format 
  //(decrementing by a value of 1 and updating the display every 1000ms).
  it("Should display the time-left properly", (done) => {
    mounted.setState({ sessionLength: 25, timeMins: 25, timeSecs: 0});
    expect(mounted.find("#time-left").text()).toEqual("25:00");
    mounted.instance().onStartStopClick();
    setTimeout(()=> {
      expect(mounted.find("#time-left").text()).toEqual("24:58");
      done();
    }, 2100);
  })

  
  // User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.
  it("Should pause the countdown if the element with id start_stop is clicked while timer is running", (done) => {
    mounted.setState({ sessionLength: 25, timeMins: 25, timeSecs: 0, timerIsRunning: true });
    // start timer...
    mounted.instance().onUpdateTimer();
    mounted.find("#start_stop").simulate('click');
    setTimeout(()=> {
      expect(mounted.find("#time-left").text()).toEqual("24:59");
      done();
    }, 2100);
  })

  // User Story #21: If the timer is paused and I click the element 
  //with id="start_stop", the countdown should resume running 
  //from the point at which it was paused.
  it("Should resume timer from the point it was paused at", (done) => {
    mounted.setState({ sessionLength: 25, timeMins: 25, timeSecs: 0, timerIsRunning: true });
    // start timer...
    mounted.instance().onUpdateTimer();
    mounted.find("#start_stop").simulate('click');
    setTimeout(()=> {
      expect(mounted.find("#time-left").text()).toEqual("24:59");
      mounted.find("#start_stop").simulate('click');
      setTimeout(()=> {
        expect(mounted.find("#time-left").text()).toEqual("24:58");
        done();
      }, 1100)
    }, 1100);
  })

  // User Story #22: When a session countdown reaches zero 
  //(NOTE: timer MUST reach 00:00), and a new countdown begins,
  // the element with the id of timer-label should display a 
  //string indicating a break has begun.
  //User Story #23: When a session countdown reaches zero
  //NOTE: timer MUST reach 00:00),
  // a new break countdown should begin,
  // counting down from the value currently
  // displayed in the id="break-length" element.
  it('Should change from Session to Break when countdown reaches 0, and then start a new timer from the breaklength', (done) => {
    mounted.setState({ timeMins: 0, timeSecs: 0, timerIsRunning: true, breakLength: 4 });
    mounted.instance().onUpdateTimer();
    expect(mounted.find("#timer-label").text()).toEqual("Break")
    expect(mounted.state('timeMins')).toEqual(4);
    setTimeout(()=> {
      expect(mounted.find("#time-left").text()).toEqual("03:59");
      done();
    }, 1100)
  });

  // User story #24: When a break timer reaches 0, timer-label changes to Session
  // User story #25: When a break timer reaches 0, a new session timer starts at the session length.
  it('Should change from Break to Session when countdown reaches 0, and then start a new timer from the sessionlength', (done) => {
    mounted.setState({ timeMins: 0, timeSecs: 0, timerIsRunning: true, sessionLength: 13, timeLabel: "Break" });
    mounted.instance().onUpdateTimer();
    expect(mounted.find("#timer-label").text()).toEqual("Session")
    expect(mounted.state('timeMins')).toEqual(13);
    setTimeout(()=> {
      expect(mounted.find("#time-left").text()).toEqual("12:59");
      done();
    }, 1100)
  }) 

  
 
  // User Story #26: When a countdown reaches zero
  // (NOTE: timer MUST reach 00:00), 
  //a sound indicating that time is up should play. 
  //This should utilize an HTML5 audio tag and have a corresponding id="beep".
  it("Should play audio when a time reaches 0 through an HTML5 audio tag with id='beep'", () => {
    let mockAudioPlay = jest.fn();
    // mock the audio play function
    window.HTMLMediaElement.prototype.play = mockAudioPlay;
    mounted.setState({ timeMins: 0, timeSecs: 0, timerIsRunning: true, sessionLength: 13, timeLabel: "Break" });
    expect(mounted.find("#beep").length).toEqual(1);
    expect(mounted.find("#beep").first().is('audio')).toEqual(true);
    mounted.instance().onUpdateTimer();
    // make sure the audio play function is called when the timer is finished.
    expect(mockAudioPlay).toHaveBeenCalledTimes(1);
  })

  afterEach(() => {
    wrapper.unmount()
    mounted.unmount();
  })

});

