import React, { Component } from 'react'
import './App.css';
import {useHistory} from 'react-router-dom';
const gstregx = RegExp('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
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
class Shopform extends Component {
     constructor(props) {
         super(props)
         this.state = {
              OwnerName:null,
              ShopName:null,
              gstNo:null,
              Sphono:null,
              Semail:null,
              Spassword:null,
              formErrors:{
                  OwnerName:"",
                  ShopName:"",
                  gstNo:"",
                  Sphono:"",
                  Semail:"",
                  Spassword:""
              }
         };
     }
     handleSubmit= e =>{
         e.preventDefault();
         if(formValid(this.state)){
             console.log(`Submited valid form`);
             let path=`/login`
             this.props.history.push(path);
         }
         else{
             alert('Invalid form');
             let path=`/map`
             this.props.history.push(path);
         }
     }
     handleChange = e =>{
        e.preventDefault();
        const{name,value}=e.target;
        let formErrors = this.state.formErrors;
        switch(name){
            case "OwnerName":
                formErrors.OwnerName = value.length < 3 ? "Minimum 3 characters required":"";
                break;
            case "ShopName":
                    formErrors.ShopName = value.length < 3 ? "Minimum of 3 characters required":"";
                    break;
            case "gstNo":
                    formErrors.gstNo = gstregx.test(value) ?"":"Invalid GST Number";
                    break;;
            case "Sphono":
                formErrors.Sphono = value.length == 10 && value == Number ?"Invalid Phone Number":"";
                break;
            case "Semail":
                formErrors.Semail = emailRegex.test(value) ? "":"Invalid Email-id";
                break;
            case "Spassword":
                formErrors.Spassword = value.length < 3 ? "Minimum  3 characters required":"";
                break;
        }
        this.setState({formErrors,[name]:value},()=>console.log(this.state));
     }
     
    render() {
        const {formErrors}=this.state;
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <h1>Shop Registration Form</h1>
                    <div className="OwnerName">
                    <input type="text" className={formErrors.OwnerName.length > 0 ?"error":null} placeholder="Name" name="OwnerName" noValidate onChange={this.handleChange}/>
                    {formErrors.OwnerName.length>0 && (<span className="errormessage">{formErrors.OwnerName}</span>)}
                    </div>
                    <div className="ShopName">
                    <input type="text" className={formErrors.ShopName.length > 0 ?"error":null} placeholder="Shop Name" name="ShopName" noValidate onChange={this.handleChange} />
                    {formErrors.ShopName.length>0 && (<span className="errormessage">{formErrors.ShopName}</span>)}
                    </div>
                    <div className="gstNo">
                        <input type="text" className={formErrors.gstNo.length > 0 ?"error":null} placeholder="GST Number" name="gstNo" noValidate onChange={this.handleChange}/>
                        {formErrors.gstNo.length>0 && (<span className="errormessage">{formErrors.gstNo}</span>)}
                    </div>
                    <div className="Sphono">
                        <input type="text" className={formErrors.Sphono.length > 0 ?"error":null} placeholder="Phone Number" name="Sphono" noValidate onChange={this.handleChange}/>
                        {formErrors.Sphono.length>0 && (<span className="errormessage">{formErrors.Sphono}</span>)}
                    </div>
                    <div className="Semail">
                        <input type="email" className={formErrors.Semail.length > 0 ?"error":null} placeholder="Email" name="Semail" noValidate onChange={this.handleChange}/>
                        {formErrors.Semail.length>0 && (<span className="errormessage">{formErrors.Semail}</span>)}
                    </div>
                    <div className="Spassword">
                        <input type="password" className={formErrors.Spassword.length > 0 ?"error":null} placeholder="Password" name="Spassword" noValidate onChange={this.handleChange}/>
                        {formErrors.Spassword.length>0 && (<span className="errormessage">{formErrors.Spassword}</span>)}
                    </div>
                    <div className="creatAccount">
                        <button type="submit">Submit</button>
                    </div>
                   </form>
                </div>
                
            </div>
        )
    }
}
export default Shopform
