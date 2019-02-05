import React from 'react'
import './Hero.css'
import Signin from '../Signin/Signin'
import heroImg from '../../images/detector.jpg'
import Signup from '../Signup/Signup'


const Hero = ({loadUser, onRouteChange, routeState}) => {
    return (
        <div className='hero'>
            <div className='hero__img-box'>
                <div className='bounding-box stylie'> </div>
                <img className='hero__img' src={heroImg} alt='main image' />
            </div>
        {
            routeState === 'signin'
            ? <Signin loadUser={loadUser} onRouteChange={onRouteChange} className='hero__form' />
            : <Signup loadUser={loadUser} onRouteChange={onRouteChange} className='hero__form' />

        }
        </div>
    )
}

export default Hero