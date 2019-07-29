import React, { Component } from 'react';
import Axios from 'axios';
import Datatble from './ReffDataTable';
import {merge} from 'lodash'
class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
          topTen: [],
        }
      }
      
    handleLogout = () => {
     localStorage.removeItem('token');   
     window.location.assign('http://localhost:3000/');
    }

    getModes=(array)=> {
      var frequency = {}; // array of frequency.
      var maxFreq = 0; // holds the max frequency.
      var modes = [];
      var noCount=[];
    
      for (var i in array) {
        frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.
    
        if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
          maxFreq = frequency[array[i]]; // update max.
        
        }
        noCount.push(frequency[array[i]]);
      }
   
      for (var k in frequency) {
        if (frequency[k] == maxFreq) {
          modes.push(k);
        }
      }
    
      return merge({user: modes,noCount: noCount});
    }
  // getModes=(array)=> {
  //   var frequency = {}; // array of frequency.
  //   var maxFreq = 0; // holds the max frequency.
  //   var modes = [];
  
  //   for (var i in array) {
  //     frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.
  
  //     if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
  //       maxFreq = frequency[array[i]]; // update max.
  //     }
  //     modes.push(array);
  //   }
  
  //   // for (var k in frequency) {
  //   //   if (frequency[k] == maxFreq) {
  //   //     modes.push(k);
  //   //   }
    
  //   // }
  
  //   return modes;
  // }

    componentDidMount(){
        Axios.get('http://18.220.236.209/api/users/all-users')
        .then(function (response) {
          // handle success
          console.log('response', response.data.users.length);
    
          localStorage.setItem('topTen',(JSON.stringify(response.data.users)));
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
       
        if(localStorage.getItem('topTen')!==null){
          let result = JSON.parse(localStorage.getItem('topTen') && localStorage.getItem('topTen')).map(({ refferalCode }) => refferalCode)
        
          let removeEmpty=result.filter(v=>v!='');
  
    let finalValue = this.getModes(removeEmpty);
    localStorage.setItem('noCount', JSON.stringify(finalValue));
          // var jobsUnique = removeEmpty.filter(function(item, index){
          //   return removeEmpty.indexOf(item) >= index;
          // });
          // let finalValue = this.getModes(removeEmpty);
          // console.log(jobsUnique)
          const objectvalue = (removeEmpty);
          localStorage.setItem('finalValuess',JSON.stringify(objectvalue))
   

        }
          
    }

    render() { 
        const Reff = localStorage.getItem('topTen') && JSON.parse(localStorage.getItem('topTen'));
       
        const count = JSON.parse(localStorage.getItem('noCount'));
 return ( 
    <div>
 <div>
            <a  className="homepage" onClick={this.handleLogout}>Logout</a>
                    <h2 className="h2-heading">Our Website is coming soon!</h2>
                 
                  
        </div>

        <div className="styling"> 
            <h3 className="heading_text">Top Refferals</h3>

            <div className="dataTable">
                  <h1>Refferal Information</h1>
                    <Datatble
                      agentDashboardData={Reff && Reff || []}
                      noCount={count && count}
                    />

                  </div>
                {/* {Reff[0]} <br />
                {Reff[1]}<br />
                {Reff[2]}<br />
                {Reff[3]}<br />
                {Reff[4]}<br />
                {Reff[5]}<br />
                {Reff[6]}<br />
                {Reff[7]}<br />
                {Reff[8]}<br />
                {Reff[9]}<br />
                {Reff[10]}<br /> */}
               
             
        </div>
     
        </div>
        );
    }
}
 
export default HomePage;