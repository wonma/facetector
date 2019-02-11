import React from 'react'
import './AutoUrl.css'

const AutoUrl = ({ onAutoUrl }) => {
    return (
        <div className='auto-url' onClick={onAutoUrl}>
            <span className='auto-url__text'>TEST IMAGE</span>
        </div>
    )
}

export default AutoUrl