import React from 'react'
import './Header.css'
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

const Header = ({ onRouteChange, routeState }) => {
    return (
        <div className='header'>
            <Logo />
            <Navigation routeState={routeState} onRouteChange={onRouteChange} /> 
        </div>
    )
}

export default Header