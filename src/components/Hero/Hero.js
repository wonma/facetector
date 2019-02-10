import React from 'react'
import './Hero.css'
import Signin from '../Signin/Signin'
import heroImg from '../../images/detector.jpg'
import Signup from '../Signup/Signup'


const Hero = ({onGuestLogin, loadUser, onRouteChange, routeState}) => {
    return (
        <div className='hero'>
            <div className='hero__img-box'>
                <div className='bounding-box stylie'> </div>
                <img className='hero__img' src={heroImg} alt='main' />
            </div>
        {
            routeState === 'signin'
            ? <Signin onGuestLogin={onGuestLogin} loadUser={loadUser} onRouteChange={onRouteChange} className='hero__form' />
            : <Signup onGuestLogin={onGuestLogin} loadUser={loadUser} onRouteChange={onRouteChange} className='hero__form' />

        }
        </div>
    )
}

export default Hero