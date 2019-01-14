import React from 'react'
import './Signup.css'

const Signup = ({ onRouteChange }) => {
    return (
        <form className="sign-up">
            {/* Sign up */}
            <fieldset id="sign-up" className="sign-up__form">
                <legend className="f4 fw6 ph0 mh0">Ready to have Fun? Please sign up!</legend>
                <div className="mt3">
                    <label className="" htmlFor="email-address">Email</label>
                    <input className="" type="email" name="email-address" id="email-address" />
                </div>
                <div className="mv3">
                    <label className="" htmlFor="password">Password</label>
                    <input className="" type="password" name="password" id="password" />
                </div>
            </fieldset>

            {/* Sign up Button */}
            <div className="sign-up__btn">
                <input onClick={() => onRouteChange('home')} className="" type="submit" value="Sign up" />
            </div>

            {/* Extra Button */}
            <div className="sign-up__extra-btn">
                <a href="#0" onClick={() => onRouteChange('signin')} className="">Aready have an id?</a>
            </div>
        </form>
    )
}

export default Signup