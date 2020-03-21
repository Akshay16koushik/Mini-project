import React, { Component } from 'react'
import './App.css'
 class Login extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <form>
                        <h1>Login Page </h1>
                    <div className="email">
                        <input type="email" placeholder="Enter your Email" name="email" noValidate onChange={this.handleChange}/>
                    </div>
                    <div className="password">
                        <input type="password" placeholder="Password" name="password" noValidate onChange={this.handleChange}/>
                    </div>
                    <div className="loginclick">
                        <button type="submit">Login</button>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login
