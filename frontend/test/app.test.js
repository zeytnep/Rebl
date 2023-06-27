import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';

import MyComponent from '../src/App';


describe('My first test suite!', () => {
  it('correctly renders', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
