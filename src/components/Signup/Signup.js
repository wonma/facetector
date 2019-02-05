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
                    <legend className="mb3 sign-up__title">Create your id</legend>
                    {/* Extra Button */}
                    <div >
                        <a href="#0" onClick={() => this.props.onRouteChange('signin')} className="sign-up__extra-btn">Aready have an id?</a>
                    </div>
                    <div className="mt4 sign-up__name">
                        <label className="sign-up__title-name" htmlFor="name">Name</label>
                        <input className="sign-up__field" onChange={this.onNameChange} type="email" name="name" id="name" />
                    </div>
                    <div className="mt3 sign-up__email">
                        <label className="sign-up__title-email" htmlFor="email-address">Email</label>
                        <input className="sign-up__field" onChange={this.onEmailChange} type="email" name="email-address" id="email-address" />
                    </div>
                    <div className="mv3 sign-up__password">
                        <label className="sign-up__title-password" htmlFor="password">Password</label>
                        <input className="sign-up__field" onChange={this.onPasswordChange} type="password" name="password" id="password" />
                    </div>
                </fieldset>

                {/* Sign up Button */}
                <input onClick={this.onSubmit} className="sign-up__btn" type="submit" value="Sign up" />
            </div>
        )
    }
}

export default Signup