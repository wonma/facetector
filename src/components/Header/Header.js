import React from 'react'
import './Header.css'
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

const Header = ({ onRouteChange, routeState, onLogOut }) => {
    return (
        <div className='header-box'>
            <div className='wrapper'>
                <div className='header'>
                    <Logo />
                    <Navigation routeState={routeState} onRouteChange={onRouteChange} onLogOut={onLogOut} /> 
                </div>
            </div>
        </div>
    )
}

export default Header