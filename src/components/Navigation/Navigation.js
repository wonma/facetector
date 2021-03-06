import React from 'react'
import './Navigation.css'


const Navigation = ({ routeState, onLogOut }) => {

    return (
        <nav className='navi'>
            <div className='navi__sns' >
                <a href="https://twitter.com/Doyouwonmi" className="navi__menu navi__twitter" target='_blank' rel='noopener noreferrer'>twitter</a>
                <a href="https://github.com/wonma/My-Learning-Tracker" className="navi__menu navi__github" target='_blank' rel='noopener noreferrer'>github</a>
            </div>    
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