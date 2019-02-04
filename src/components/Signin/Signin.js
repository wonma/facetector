import React, { Component } from 'react'
import './Signin.css'
import { userInfo } from 'os';

class Signin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: '',
            failFrom:''
        }
    }

    onEmailChange = (e) => {
        this.setState({ signInEmail: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({ signInPassword: e.target.value })
    }


    onWrongUser = () => {
        document.querySelector('#check-message').classList.remove('show-check-message')
        document.querySelector('#check-message').classList.add('show-check-message')
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
            if (user.id) {                          // 성공한 후 반응 두 가지
                this.props.onRouteChange('home')    // (1) home 화면 render
                this.props.loadUser(user)           // (2) user정보 넘겨서 state 업뎃하기
            } else if (user === 'No blank fields' ) {
                this.onWrongUser()
                this.setState({failFrom: 'blank'})
            } else if (user === 'Unable to sign in') {
                this.onWrongUser()
                this.setState({ failFrom: 'wrongInfo' })
            }
        })
        .catch(err => console.log('Failed to fetch')) 
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
                <div id="check-message" className="no-show-check-message">
                    {   this.state.failFrom === 'blank'
                        ? <p >Check out email or password</p>
                        : <p >Wrong Email or password</p>
                    }
                </div>
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