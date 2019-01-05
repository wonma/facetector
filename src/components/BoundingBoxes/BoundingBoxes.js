import React from 'react'
import './BoundingBoxes.css'

const BoundingBoxes = ({boxPosition}) => {
    return boxPosition.map((box, i) => {
        return (
            <div key={i} className='bounding-box'
                style={{
                    top: box.top,
                    right: box.right,
                    left: box.left,
                    bottom: box.bottom
                }} >
            </div>
        )
    })
}

export default BoundingBoxes