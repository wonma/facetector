import React from 'react'
import './Hero.css'
import Signin from '../Signin/Signin'
import heroImg from '../../images/hero.JPG'
import Signup from '../Signup/Signup'


const Hero = ({onRouteChange, routeState}) => {
    return (
        <div className='hero'>
            <div className='hero__img-box'>
                <img className='hero__img' src={heroImg} alt='main image' />
            </div>
            {
                routeState === 'signin'
              ? <Signin onRouteChange={onRouteChange} className='hero__form' />
              : <Signup onRouteChange={onRouteChange} className='hero__form' />

            }
        </div>
    )
}

export default Hero