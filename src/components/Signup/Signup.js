import React, { Component } from 'react'
import './Signup.css'

class Signup extends Component{
    constructor(props) {
        super(props)
        this.state = {
            signUpName: '',
            signUpEmail: '',
            signUpPassword: ''
        }
    }

    onNameChange = (e) => {
        this.setState({ signUpName: e.target.value })
    }  
    
    onEmailChange = (e) => {
        this.setState({ signUpEmail: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ signUpPassword: e.target.value })
    }

    onSubmit = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.signUpName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword
            })
        }).then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.onRouteChange('home')
                    this.props.loadUser(user)
                }
            })
            .catch(err => {console.log('unable to register')})
    }

    render() {
        return (
            <div className="sign-up">
                {/* Sign up */}
                <fieldset id="sign-up" className="sign-up__form">
                    <legend className="sign-up__title">Create your id</legend>
                    <div className="mt3">
                        <label className="" htmlFor="name">Name</label>
                        <input className="" onChange={this.onNameChange} type="email" name="name" id="name" />
                    </div>
                    <div className="mt3">
                        <label className="" htmlFor="email-address">Email</label>
                        <input className="" onChange={this.onEmailChange} type="email" name="email-address" id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="" htmlFor="password">Password</label>
                        <input className="" onChange={this.onPasswordChange} type="password" name="password" id="password" />
                    </div>
                </fieldset>

                {/* Sign up Button */}

                <input onClick={this.onSubmit} className="sign-up__btn" type="submit" value="Sign up" />


                {/* Extra Button */}
                <div className="sign-up__extra-btn">
                    <a href="#0" onClick={() => this.props.onRouteChange('signin')} className="">Aready have an id?</a>
                </div>
            </div>
        )
    }
}

export default Signup