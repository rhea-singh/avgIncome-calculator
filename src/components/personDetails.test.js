import React from 'react';
import PersonDetails from './personDetails';
import { api } from '../services/genericMethods';
import Adapter from 'enzyme-adapter-react-16';
//import personsArray from '../assets/persons.json';
import { shallow, configure, mount } from 'enzyme';
jest.mock('../services/genericMethods');

configure({ adapter: new Adapter() });
let wrapper;

beforeEach(()=>{
  wrapper = mount(<PersonDetails />);
})

describe('PersonDetails', () => {
  
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

    it("should set the state value when component is loaded", () => {
      shallow(<PersonDetails />);
      expect(wrapper.instance().state("personDetails")).toBe([]);
      wrapper.filterPersonsObj();
      wrapper.getSalary(personsArray);
      expect(wrapper.state("personDetails")).toBe([]);
    });

  // The assertion for a promise must be returned.
  it('filterPersonsObj function is called once', () => {
    const spy = jest.spyOn(PersonDetails.prototype, 'filterPersonsObj');
    mount(<PersonDetails />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

   // The assertion for a promise must be returned.
   it('getSalary function is called once', () => {
    const spy = jest.spyOn(PersonDetails.prototype, 'getSalary');
    mount(<PersonDetails />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // The assertion for a promise must be returned.
  it('getAvgSalary function is called once', () => {
    const spy = jest.spyOn(PersonDetails.prototype, 'getAvgSalary');
    mount(<PersonDetails />);
    wrapper.instance().getSalary(personsArray);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should render the datalist component if personDetails array is available and not empty', () => {
    wrapper.setState({ personDetails: personsArray });
    expect(wrapper.find(".dl-fragment")).toBeDefined();
});

  it('rendering data inside template based on provided personDetails array', () => {
    mount(<PersonDetails />);

    // There should be ONLY 1 template element
    const template = wrapper.find('template');;
    expect(template).toHaveLength(1);

    // Each dd and dt tag text should equal to correct person details
      let [fname, lastname] = personsArray[0].name.split(" ");
      const dt = wrapper.find('.dt-name');
      expect(dt).toHaveLength(personsArray.length);
      expect(dt.at(0).text()).toEqual(lastname + ', ' + fname);
      const dd = template.find('.dd-income');
      expect(dd).toHaveLength(personsArray.length);
      expect(dd.at(0).text()).toEqual(personsArray[0].income);
  });
});