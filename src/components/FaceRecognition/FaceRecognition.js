import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='search-result'>
            <div>
                <img src={imageUrl} alt='detection result' width='500px' height='auto' />
            </div>
        </div>
    )
}

export default FaceRecognition