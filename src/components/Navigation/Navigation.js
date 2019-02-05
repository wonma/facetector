import React from 'react'
import './Navigation.css'


const Navigation = ({ onRouteChange, routeState, onLogOut }) => {
    return (
        <nav className='navi'>    
            <a href="https://twitter.com/Doyouwonmi" className="navi__menu navi__twitter">twitter</a>
            <a href="https://github.com/wonma/My-Learning-Tracker/blob/master/log.md" className="navi__menu navi__github">github</a>
            {
                routeState === 'home'
                    ? <p onClick={onLogOut}
                        className='navi__menu navi__logout'>
                        LOG OUT
                </p>
                    : <p> </p> // <-- 로그아웃 버튼 없는 비어있는 상태
            }
            </nav>
    )
}

export default Navigation