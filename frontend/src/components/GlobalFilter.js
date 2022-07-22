import React from 'react'
import './GlobalFilter.css'
import search from '../icons/search.png'

function GlobalFilter({ filter, setFilter }) {
    return (
        <div>
            <span className='search__bar'>
                <img src={search} alt="imagen" className='search__image' />
                <input placeholder='Search' value={filter || ''} onChange={(e) => setFilter(e.target.value)}/>
            </span>
        </div>
    );
}

export default GlobalFilter
