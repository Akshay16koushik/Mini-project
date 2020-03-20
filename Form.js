import React, { Component } from 'react';
import './App.css'
import {Redirect, Route, Switch} from 'react-router-dom';
import {BrowserRouter as Router,Prompt} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
let lng;
let lat;
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const formValid = ({formErrors, ...rest}) => {
  let valid = true;
  Object.values(formErrors).forEach(val =>{val.length > 0 && (valid=false); 
});
Object.values(rest).forEach(val =>  {
  val==null && (valid=false)
});
return valid;
};
 class Form extends Component {
   constructor(props) {
     super(props)
     this.state = {
        firstName:null,
        phono:null,
        email:null,
        password:null,
        formErrors:{
          firstName:"",
          phono:"",
          email:"",
          password:""
        }
     };
   }
   handleSubmit=(e)=>{
      e.preventDefault();
    
      if(formValid(this.state) && navigator.geolocation){
        console.log(`
        -----Submiting------------
        First Name:${this.state.firstName}
        Phone number:${this.state.phono}
        email:${this.state.email}
        password:${this.state.password}

        `);
        console.log(lat)
    let path =`/login`
    this.props.history.push(path);
    
      }
     else{
        console.log('Form is invalid')
      }

    
   }

   handleChange = e =>{
    e.preventDefault();
    const {name,value} = e.target;
    let formErrors = this.state.formErrors;
   
    switch(name){
      case "firstName":
            formErrors.firstName = value.length < 3  ? "Minimun 3 characters required":"";
            break;
      case "phono":
              formErrors.lastName = value.length ==  10 && value == Number ? "10 Numbers  required":"";
              break;
      case "email":
            formErrors.email = emailRegex.test(value)  ?"" : "invalid email";
             break;
      case "password":
              formErrors.password = value.length < 3  ? "Minimun 3 characters required":"";
              break;
      default:
          break;

  
    }
    this.setState({formErrors,[name]:value},()=>console.log(this.state));
 
  };
  handleClick =e =>{
    navigator.geolocation.watchPosition(getposition);
    function getposition(position){
        lat=position.coords.latitude;
        lng=position.coords.longitude;
    }
    
 }


    render() {     
      const {formErrors}= this.state;
        return (
<div className="wrapper">
      <div className="form-wrapper">
    <h1> Create Account</h1>
    <form onSubmit={this.handleSubmit} noValidate>
    <div className="firstName">
        <label htmlFor="firstName">First Name</label>
        <input type="text" className={formErrors.firstName.length > 0 ?"error":null} placeholder="First Name" name="firstName" noValidate onChange={this.handleChange}/>
        {formErrors.firstName.length >0 && (<span className="errormessage">{formErrors.firstName}</span>)}
      </div>
      <div className="phono">
        <label htmlFor="phono">Phone number</label>
        <input type="text" className={formErrors.phono.length > 0 ?"error":null} placeholder="Phone number" name="phono" noValidate onChange={this.handleChange}/>
        {formErrors.phono.length >10 && (<span className="errormessage">{formErrors.firstName}</span>)}
      </div>
      <div className="email">
        <label htmlFor="email">Email</label>
        <input type="email" className={formErrors.email.length > 0 ?"error":null} placeholder="Email" name="email" noValidate onChange={this.handleChange}/>
        {formErrors.email.length <0 && (<span className="errormessage">{formErrors.firstName}</span>)}
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input type="password" className={formErrors.password.length > 0 ?"error":null} placeholder="Password" name="password" noValidate onChange={this.handleChange}/>
        {formErrors.password.length >0 && (<span className="errormessage">{formErrors.firstName}</span>)}
      </div>
      <div className="creatAccount">
        <button type="submit" onClick={this.handlClick}>Create Account</button>
        <small>Already  Have an Account?</small>
      </div>
    </form>
    </div>
    </div>
        )
    } 
}
export default Form
