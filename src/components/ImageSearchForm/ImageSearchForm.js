import React from 'react'
import './ImageSearchForm.css'





const ImageSearchForm = ({onInputChange, onClickEvent}) => {
    return (
        <div className='imgSearch'>
            <h2 className='imgSearch__title'>
                {'Find the faces and receive a score!'}
            </h2>
            <div className='imgSearch__form'>
                <input id='imgSearchInput' className='imgSearch__input' placeholder='Image Url Here' onChange={onInputChange} />
                <button className='imgSearch__button' onClick={onClickEvent}>FIND</button>
            </div>
        </div>
    )
}


export default ImageSearchForm