import React, { Component } from 'react'
import './Signin.css'
import { userInfo } from 'os';

class Signin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({ signInEmail: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({ signInPassword: e.target.value })
    }

    onSubmit = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.onRouteChange('home')
                this.props.loadUser(user)
            } 
        }) 
    }

    render() {
        return (
            <div className="sign-in">
                {/* Sign in */}
                <fieldset id="sign-in" className="sign-in__form">
                    <legend className="sign-in__title">Sign in and have fun!</legend>
                    <div className="mt3">
                        <label className="" htmlFor="email-address">Email</label>
                        <input className="" onChange={this.onEmailChange} type="email" name="email-address" id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="" htmlFor="password">Password</label>
                        <input className="" onChange={this.onPasswordChange} type="password" name="password" id="password" />
                    </div>
                </fieldset>

                {/* Sign in Button */}

                <input onClick={this.onSubmit} className="sign-in__btn" type="button" value="Sign in" />


                {/* Extra Button */}
                <div className="sign-in__extra-btn">
                    <a href="#0" onClick={() => this.props.onRouteChange('signup')} className="">No id? Create one for quick!</a>
                </div>
            </div>
        )
    }
} 

export default Signin