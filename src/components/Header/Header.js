import React from 'react'
import './Header.css'
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

const Header = ({ onRouteChange, routeState, onLogOut }) => {
    return (
        <div className='header'>
            <Logo />
            <Navigation routeState={routeState} onRouteChange={onRouteChange} onLogOut={onLogOut} /> 
        </div>
    )
}

export default Header