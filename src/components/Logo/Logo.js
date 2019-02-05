import React from 'react'
import './Logo.css'
import iconDetection from './face-detection.svg'
import Tilt from 'react-tilt'

const Logo = () => {
    return (
        <div className='logo'>
            <div className='logo__icon-box'>
                <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 48, width: 48 }} >
                    <div className="Tilt-inner">
                        <img className='logo__icon' src={iconDetection} alt='face decection icon' />
                    </div>
                </Tilt>
            </div>
            <div className='logo__title-box'>
                <span className='logo__title logo__title-face'>Face</span>
                <span className='logo__title logo__title-tector'>Tector</span>
            </div>
        </div>
    )
}

export default Logo