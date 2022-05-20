import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PersonDetails from './personDetails';

Enzyme.configure({ adapter: new Adapter() });
describe('PersonDetails', () => {
  it('should show the text', () => {
  const personDetailsInstance = shallow(<PersonDetails />);
  const element = personDetailsInstance.find('div div');
  expect(element.text()).toBe('This will be toggled');
 });
});