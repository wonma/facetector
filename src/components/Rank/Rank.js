import React from 'react'
import './Rank.css'

const Rank = ({ name, rank }) => {
    return (
        <div className='rank'>
            <p className='rank__explanation'>{'Hello,'}  <span className='rank__point'>{name}</span>{'!'}</p>
            <p className='rank__grade'> {'Your score is'} <span className='rank__point'>{rank}</span> {':)'} </p>
        </div>
    )
}

export default Rank