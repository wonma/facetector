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
            } else if (user === 'blank' ) {
                this.onWrongUser()
                this.setState({failFrom: 'blank'})
            } else if (user === 'wronginfo') {
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
                    {/* Extra Button */}
                    <div>
                        <a className="sign-in__extra-btn" href="#0" onClick={() => this.props.onRouteChange('signup')}>No id? Click me!</a>
                    </div>

                    <legend className="mb3 sign-in__title">Login and Score!</legend>

                    <div className="mt4 sign-in__email">
                        <label className="sign-in__title-email" htmlFor="email-address">Email</label>
                        <input className="sign-in__field sign-in__field-email" autoComplete='true' onChange={this.onEmailChange} type="email" name="email-address" id="email-address" />
                    </div>

                    <div className="mt3 sign-in__password">
                        <label className="sign-in__title-password" htmlFor="password">Password</label>
                        <input className="sign-in__field" onChange={this.onPasswordChange} type="password" name="password" id="password" />
                    </div>

                </fieldset>

                {/* Sign in Button */}
                <div id="check-message" className="no-show-check-message">
                    {   this.state.failFrom === 'blank'
                        ? <p >Check email or password</p>
                        : <p >Wrong Email or password</p>
                    }
                </div>
                <input onClick={this.onSubmit} className="sign-in__btn" type="button" value="Sign in" />
            </div>
        )
    }
} 

export default Signin