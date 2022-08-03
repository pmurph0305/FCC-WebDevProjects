import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe("Adjustable Times tests", () => {
  let wrapper;
  beforeEach(() => wrapper=shallow(<Button/>));

  it("Is a clickable button", () => {
    let mockClick = jest.fn();
    wrapper.setProps({onClick:mockClick});
    wrapper.simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
  })
});