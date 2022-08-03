import React from 'react';
import { shallow } from 'enzyme';
import AdjustableTimes from './AdjustableTimes';

describe("Adjustable Times tests", () => {
  let wrapper;
  beforeEach(() => wrapper=shallow(<AdjustableTimes/>));

  // User Story #3: I can see two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement".
  it('Has clickable decrement elements', () => {
    let mockDecrement = jest.fn();
    wrapper.setProps({onDecrement: mockDecrement, idButtonDown: "testDown"})
    wrapper.find("#testDown").simulate('click');
    expect(mockDecrement).toHaveBeenCalledTimes(1);
  })

  //I Can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment"
  it('Has clickable increment elements', () => {
    let mockIncrement = jest.fn();
    wrapper.setProps({onIncrement: mockIncrement, idButtonUp: "testUp"});
    wrapper.find("#testUp").simulate('click');
    expect(mockIncrement).toHaveBeenCalledTimes(1);
  })
})