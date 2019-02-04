import React from 'react'
import './Navigation.css'

const Navigation = ({ onRouteChange, routeState, onLogOut }) => {
    return (
        <nav className='navi'>    
            {
                routeState === 'home'
              ? <p onClick={onLogOut}
                   className='navi__menu navi__logout'>
                    LOG OUT
                </p>
              : <p> </p> // <-- 로그아웃 버튼 없는 비어있는 상태
            }
            <p className='navi__menu'>twitter</p>
            <p className='navi__menu'>github</p>
        </nav>
    )
}

export default Navigation