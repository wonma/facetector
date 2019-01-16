import React from 'react'
import './Rank.css'

const Rank = ({ name, rank }) => {
    return (
        <div className='rank'>
            <span className='rank__explanation'>{'Hello,'} {name}{'!'}</span>
            <span> {'Your rank is'} {rank} {':)'} </span>
        </div>
    )
}

export default Rank