import React from 'react';
import { api } from '../services/genericMethods';
import personsArray from '../assets/persons.json';
import './personDetails.css';  

  export default class PersonDetails extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {personDetails: []};
    }

    componentDidMount() {
      // call API with person object to fetch their individual salary
      let promiseArray = [];
      personsArray.forEach((person)=> {
        if(person.age >= 35)
         promiseArray.push(api(person));
     });
     this.getSalary(promiseArray);
    }
  
    getSalary(apiCallsArray){
        Promise.all(apiCallsArray)
            .then((response) => {
                this.setState({personDetails: response});
                this.getAvgSalary(response); 
            }).catch((error)=>{
                console.log(error);
            });
    }

    getAvgSalary(personsArr){
        let totalSalary = 0;
        personsArr.forEach((person)=> {
            totalSalary += person.income;
         });
        console.log('Average salary of all the people on the list is : ', Math.abs(totalSalary/personsArr.length));
    }
  
    render() {
    const { personDetails } = this.state;
      return (
     <template id="payroll-entry">
        {personDetails &&  personDetails.map((person, i)=>
           { 
            let [fname, lastname] = person.name.split(" ");
           return (
            <React.Fragment key={i}>
            <dt>{lastname}, {fname}</dt>
            <dd>{person.income}</dd>
            </React.Fragment>
            )})}
     </template>  
      );
    }
  }