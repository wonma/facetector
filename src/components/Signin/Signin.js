import React from 'react'
import './Signin.css'

const Signin = ({onRouteChange}) => {
    return (
        <div className="sign-in">
            {/* Sign in */}
            <fieldset id="sign-in" className="sign-in__form">
                <legend className="sign-in__title">Sign in and have fun!</legend>
                <div className="mt3">
                    <label className="" htmlFor="email-address">Email</label>
                    <input className="" type="email" name="email-address" id="email-address" />
                </div>
                <div className="mv3">
                    <label className="" htmlFor="password">Password</label>
                    <input className="" type="password" name="password" id="password" />
                </div>
            </fieldset>

            {/* Sign in Button */}
            
            <input onClick={() => onRouteChange('home')} className="sign-in__btn" type="submit" value="Sign in" />
            

            {/* Extra Button */}
            <div className="sign-in__extra-btn">
                <a href="#0" onClick={() => onRouteChange('signup')} className="">No id? Create one for quick!</a>
            </div>
        </div>
    )
}

export default Signin