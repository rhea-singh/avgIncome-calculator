import React from 'react';
import PersonDetails from './personDetails';
import Adapter from 'enzyme-adapter-react-16';
//import personsArray from '../assets/persons.json';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('PersonDetails', () => {
  const wrapper = shallow(<PersonDetails />);
  const personsArray = 
  [
    {
        "name": "Sarah Smith",
        "age": 37
    },
    {
        "name": "Lisa Crow",
        "age": 35
    },
    {
        "name": "Samuel Jackson",
        "age": 53
    },
    {
        "name": "Pamela Black",
        "age": 47
    },
    {
        "name": "Peter White",
        "age": 36
    }
];

  it('rendering data inside template based on provided input array', () => {
  // There should be ONLY 1 template element
  const template = wrapper.find('template');;
  expect(template).toHaveLength(1);
  // The dt should have as many elements as the personsArray array
  const dt = template.find('dt');
  expect(dt).toHaveLength(personsArray.length);
  // The dd should have as many elements as the personsArray array
  const dd = template.find('dd');
  expect(dd).toHaveLength(personsArray.length);
  // Loop through each row and check the content
  // rows.forEach((tr, rowIndex) => {
  //   const cells = tr.find('td');
  //   expect(cells).toHaveLength(cols.length);
  //   expect(cells.at(0).text()).toEqual(data[rowIndex].id);
  //   expect(cells.at(1).text()).toEqual(data[rowIndex].name);
  //   expect(cells.at(2).text()).toEqual(data[rowIndex].email);
 });

 it("should update the component state", () => {
  const form = wrapper.find('input');
  // when
  form.props().onChange({target: {
     name: 'nameX',
     value: 1234
  }});
  // then
  expect(component.state('input')).toBeDefined();
});
});