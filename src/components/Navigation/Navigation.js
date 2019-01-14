import React from 'react'
import './Navigation.css'

const Navigation = ({ onRouteChange, routeState }) => {
    return (
        <nav className='navi'>    
            {
                routeState === 'home'
              ? <p onClick={() => onRouteChange('signin')} className='navi__menu navi__logout'>LOG OUT</p>
              : <p> </p>
            }
            <p className='navi__menu'>twitter</p>
            <p className='navi__menu'>github</p>
        </nav>
    )
}

export default Navigation