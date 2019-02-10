import React, { Component } from 'react'
import './Signup.css'

class Signup extends Component{
    constructor(props) {
        super(props)
        this.state = {
            signUpName: '',
            signUpEmail: '',
            signUpPassword: '',
            failFrom: ''
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


    onWrongType = () => {
        document.querySelector('#signUpBtn').textContent = 'SIGN UP'
        document.querySelector('#check-message').classList.remove('show-check-message')
        document.querySelector('#check-message').classList.add('show-check-message')
    }
    
    onSubmit = () => {
        document.querySelector('#signUpBtn').textContent = 'GETTING IN...'

        fetch('https://tranquil-scrubland-98492.herokuapp.com/register', {
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
                } else if (user === 'blank') {
                    this.onWrongType()
                    this.setState({ failFrom: 'blank' })
                } else if (user === 'wrongpassword') {
                    this.onWrongType()
                    this.setState({ failFrom: 'wrongpassword' })
                } else if (user === 'existing') {
                    this.onWrongType()
                    this.setState({ failFrom: 'existing' })
                }
            })
            .catch(err => {console.log('unable to register')})
    }

    handleEnter = (e) => {
        if (e.keyCode === 13) {
            // Trigger the sign-in button with a click
            document.querySelector("#signUpBtn").click();
        }
    }

    render() {

        const failWhy = this.state.failFrom
        let errorMessage;

        if (failWhy === 'blank') {
            errorMessage = <p>Fill all the info above</p>
        } else if (failWhy === 'wrongpassword') {
            errorMessage = <p>password at least 4 characters</p>
        } else if (failWhy === 'existing') {
            errorMessage = <p>The email is already registered</p>
        }

        return (
            <div className="sign-up">
                {/* Sign up */}
                <fieldset id="sign-up" className="sign-up__form">
                    {/* Extra Button */}
                    <div >
                        <a href="#0" onClick={() => this.props.onRouteChange('signin')} className="sign-up__extra-btn">Aready have an id?</a>
                    </div>

                    <legend className="mb3 sign-up__title">Create ID</legend>

                    <div className="mt4 sign-up__name">
                        <label className="sign-up__title-name" htmlFor="name">Username</label>
                        <input className="sign-up__field" placeholder='Your lovely name!' onChange={this.onNameChange} type="email" name="name" id="name" />
                    </div>

                    <div className="mt3 sign-up__email">
                        <label className="sign-up__title-email" htmlFor="email-address">Email</label>
                        <input className="sign-up__field sign-up__field-email" placeholder='Any email to register :)' onChange={this.onEmailChange} type="email" name="email-address" id="email-address" />
                    </div>

                    <div className="mt3 sign-up__password">
                        <label className="sign-up__title-password" htmlFor="password">Password</label>
                        <input className="sign-up__field" onKeyUp={this.handleEnter} placeholder='At least 4 characters' onChange={this.onPasswordChange} type="password" name="password" id="password" />
                    </div>

                </fieldset>

                {/* Sign in Button */}
                <div id="check-message" className="no-show-check-message">
                    {errorMessage}
                </div>
                <div className='cta-box'>
                    <button id='signUpBtn' onClick={this.onSubmit} className="sign-up__btn" type="button" >SIGN UP</button>
                    <button id='guestBtn' onClick={this.props.onGuestLogin} className="guest_btn" type="button" >GUEST LOGIN</button>
                </div>
            </div>
        )
    }
}

export default Signup