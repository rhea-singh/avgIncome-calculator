import React from 'react';
import { api } from '../services/genericMethods';
import personsArray from '../assets/persons.json';
import './personDetails.css';  

  export default class PersonDetails extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {personDetails: []};
      this.promiseArray = [];
    }

    componentDidMount() {
     this.filterPersonsObj();
     this.getSalary(this.promiseArray);
    }

    filterPersonsObj(){
      // call API with person object to fetch their individual salary
      personsArray.forEach((person) => {
        if (person.age >= 35)
          this.promiseArray.push(api(person));
      });
    }
  
    getSalary(apiCallsArray){
        Promise.all(apiCallsArray)
            .then((response) => {
                this.setState({personDetails: response});
                console.log(this.state.personDetails)
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
            <React.Fragment key={i} class="dl-fragment">
            <dt data-testid="dt-name">{lastname}, {fname}</dt>
            <dd data-testid="dd-income">{person.income}</dd>
            </React.Fragment>
            )})}
     </template>  
      );
    }
  }