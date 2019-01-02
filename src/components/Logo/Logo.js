import React from 'react'
import './Logo.css'
import iconDetection from './face-detection.svg'
import Tilt from 'react-tilt'

const Logo = () => {
    return (
        <div className='logo'>
            <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 48, width: 48 }} >
                <div className="Tilt-inner">
                    <img className='logo__icon' src={iconDetection} alt='face decection icon' />
                </div>
            </Tilt>
            <span className='logo__title'>FaceTector</span>
        </div>
    )
}

export default Logo