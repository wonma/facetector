import React from 'react'
import './Header.css'
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

const Header = () => {
    return (
        <div className='header'>
                <Logo />
                <Navigation /> 
        </div>
    )
}

export default Header