import React, {Component } from 'react';

import Checkout from './Checkout';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      fname: '',
      lname: '',
      password: '',
      mobile: '',
      email: '',
      birthday: '',
      optradio: '',
      occupation: '',
      address: '',
      wordAddress: '',
      refferalCode: '',
      isRefferal: false,
      totalUser: '',
      mostUsedRef: '',

    }
  }
   getModes=(array)=> {
    var frequency = {}; // array of frequency.
    var maxFreq = 0; // holds the max frequency.
    var modes = [];
  
    for (var i in array) {
      frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.
  
      if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
        maxFreq = frequency[array[i]]; // update max.
      }
    }
  
    for (var k in frequency) {
      if (frequency[k] == maxFreq) {
        modes.push(k);
      }
    }
  
    return modes;
  }
  
  componentDidMount= () => {
    axios.get('http://18.220.236.209/api/users/all-users')
  .then(function (response) {
    // handle success
    console.log('response', response.data.users.length);
    const size = response.data.users.length;
    localStorage.setItem('total_user',(JSON.stringify(response.data.users.length)));
    localStorage.setItem('data',(JSON.stringify(response.data.users)));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  if(localStorage.getItem('data')!==null){
    let result = JSON.parse(localStorage.getItem('data')).map(({ refferalCode }) => refferalCode)
    let removeEmpty=result.filter(v=>v!='');
    let finalValue = this.getModes(removeEmpty);
    this.setState({totalUser: localStorage.getItem('total_user')});
    this.setState({mostUsedRef: finalValue[0]});
    }
  }
  
  onChange = e => this.setState({ [e.target.name]: e.target.value })
  notify = (message) => (toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  }));

  errorNOtify = (message) =>(toast.error(message,{
    position: toast.POSITION.TOP_CENTER

  }))
  validationChecker= (input) => {

    if(document.getElementById('fname').value===''){
      alert(`  First Name is required`);
    }
    else if(document.getElementById('lname').value===''){
      alert(`  Last Name is required`);
    }
    else if(document.getElementById('password').value===''){
      alert(`  Password is required`);
    }
    else if(document.getElementById('mobile').value===''){
      alert(`  Mobile is required`);
    }
    
    else if(document.getElementById('email').value===''){
      alert(`  Email is required`);
    }
    
    else if(document.getElementById('birthday').value===''){
      alert(`  Birthday is required`);
    }
    
    else if(document.getElementById('optradio').value===''){
      alert(`  Select Gender`);
    }
    
    else if(document.getElementById('occupation').value===''){
      alert(`  Occupation is required`);
    }
    
    else if(document.getElementById('address').value===''){
      alert(`address is required`);
    }
    
    else if(document.getElementById('wordAddress').value===''){
      alert(`Work address is required`);
    }
    else {
      this.setState({
        isClicked: true,
      })
    }
    
  }
  handlePayment = event => {
    event.preventDefault();
     this.validationChecker();
     
     axios({
      method: 'post',
      url: 'http://18.220.236.209/api/users/register',
      data: {
        ...this.state
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then((response)=>{
        console.log(response.data);
      if(response.data.isRefferer){

        this.notify("Your account is created,please login to continue");

      } else {
        
        this.notify("To complete registration, click to pay");
      }
    }).catch(err=>{
      console.log(err.response);
      this.errorNOtify(err.response.data.errors);
    })
  }
  handleLogin = event => {
    event.preventDefault();
    console.log('hit');
    const {email, password} = this.state;
    axios({
      method: 'post',
      url: 'http://18.220.236.209/api/users/login',
      data: {
        email,
        password
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then((response)=>{
      localStorage.setItem('token', response && response.data.token);
     if(response){
       axios.get('http://18.220.236.209/api/users/current', { headers: { Authorization: response.data.token }})
      .then(response => {
        this.notify("You are logged In!");
        if(response.data.status===200){
          window.location.assign('http://localhost:3000/homePage');
        } 
       
  })
 .catch((error) => {
    this.notify('Sorry! you are not logged In');
  });
     }
    }).catch(err=>{
      
       this.notify("Sorry! User not found with these credential, try again");
    });
  }
  handleReff = () => {
    var selectBox = document.getElementById("reff");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue === 'yes'){
      this.setState({
        isRefferal: true
      });
    } else if(selectedValue==='no'){
      this.setState({
        isRefferal:false
      });
    }
      else {
        this.setState({
          isRefferal:false
        });
      }
  }

  render() {
    console.log('fff', this.state)
    return (
      <div className="App">
        <p className="App-intro">
      	<div class="fb-header">
        <h3 className="header-intro"><strong>22 Trillion</strong></h3>
			<div id="form1" class="fb-header">Email or Phone<br/>
		  <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.onChange}/></div>
			
			<div id="form2" class="fb-header">Password<br />
		  <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" onChange={this.onChange}/>
			</div>
			</div>
      <input type="submit" class="submit1" value="login" onClick={event=>this.handleLogin(event)}  />
        <div className="container-fluid">
        <div className="row">
          <div className="col col-md-2">
          <div className="col col-md-2">
          <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="650" height="443" type="text/html" src="https://www.youtube.com/embed/DBXH9jJRaDk?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"><div><small><a href="https://youtubeembedcode.com/en">youtubeembedcode.com/en/</a></small></div><div><small><a href="http://add-link-exchange.com">w://add-link-exchange.com</a></small></div></iframe>
          <div>
  
          </div>
          </div>
          <div className="col col-md-10">
          <div className="col col-md-10">
          <div className="row">
          <div class="fb-body">
			<div id="intro2" class="fb-body">Create an account</div>
			<div id="intro3" class="fb-body">It’s $15, or free with referral</div>
			<div id="form3" class="fb-body">
      <input type="fname" className="form-control" id="fname" placeholder="Enter First Name" name="fname" onChange={this.onChange}/>
      <input type="lname" className="form-control" id="lname" placeholder="Enter Last Name" name="lname" onChange={this.onChange}/>
      <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" onChange={this.onChange}/>
      <input type="number" className="form-control" id="mobile" placeholder="Enter Mobile" name="mobile" onChange={this.onChange}/>
      {/* <ReactPhoneInput
  defaultCountry="us"
  value={this.state.mobile}
  onChange={() => this.setState({ mobile: this.state.mobile })}
/> */}
      <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.onChange}/>
		  <input type="date" className="form-control" id="birthday" placeholder="Enter Birthday" name="birthday" onChange={this.onChange}/>
			<input type="text" className="form-control" id="occupation" placeholder="Enter Occupation" name="occupation" onChange={this.onChange}/>
        <div className="gender">
        <span>Gender:</span> {'  '}
		
    <input type="radio" name="optradio" value="male" id="optradio" onChange={this.onChange} />  Male {' '}
    <input type="radio" name="optradio" value="female" onChange={this.onChange} />  Female<br/><br/>
        </div>
      
      <input type="text" className="form-control" id="address" placeholder="Enter Street Address" name="address" onChange={this.onChange}/>
      <input type="text" className="form-control" id="wordAddress" placeholder="Enter Work Address" name="wordAddress" onChange={this.onChange}/>

     Do you have any Refferal ? {' '} 
      <select  id="reff" className="refferal" onChange={this.handleReff}>
      <option>
        select option
      </option>
        <option value="yes">
          yes
        </option>
        <option value="no">
          No
        </option>
      </select>

    <br />
    {this.state.isRefferal ? <div><br /><input type="email" className="form-control" id="refferalCode" placeholder="Enter Refferal If any" name="refferalCode" onChange={this.onChange}/> </div> : ''}    
      	<p id="intro4">By clicking Create an account, you agree to our Terms and that 
				you have read our Data Policy, including our Cookie Use.</p>
        {this.state.isClicked && !this.state.isRefferal ?    <div><span>To complete registration click to pay </span><Checkout
            name={'Mern stack Engineer'}
            description={'Aurangzaib project payment'}
            amount={15}
          /></div>: 	<input type="submit" className="button2" value="Create an account"  onClick={event=>this.handlePayment(event)} />}
			
				<br/><hr/>
				<p id="intro5">Create a Page for a celebrity, band or business.</p>
				
			</div>
			
		</div>
    </div>
    </div>

          </div>
          <div className="row">
          <div className="col col-md-12">
          <div className="col col-md-4">
          <form action="https://www.gofundme.com/f/8yrhz-debt-releif">
          <input type="submit" className="link0" value="GoFundMe" />
              </form>
          </div>
         <div className="col col-md-4">
         <form action="https://www.gofundme.com/f/8yrhz-debt-releif">
              <input type="submit" className="link2" value="Shopify" />
              </form>
         </div>
             
             <div className="col col-md-4">
             <form action="https://www.gofundme.com/f/8yrhz-debt-releif">
              <input type="submit" className="links" value="YouTube"/>
          </form>
             </div>
             
            
            </div>
          
          </div>
          
        
          </div>
        
          <div className="advertisement"> 
            <div className="row">
            
            <div className="col col-md-12">
             
             <h2 className="ads">Your advertisement will come here</h2>
            
            </div>
            </div>
          </div>

          <div className="footer">
          <p className="register_user">
          Total Register User : {this.state.totalUser} 
          </p>
          <p className="used_refferal">
          Most Used Referral : {this.state.mostUsedRef} 
          </p>
           
          </div>
        </div>
 

  </div>

          
        </p>
        <ToastContainer />
      </div>
    );
  }
        
}

export default Header;
  
