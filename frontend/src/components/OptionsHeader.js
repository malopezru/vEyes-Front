import React from 'react'
import { Link } from 'react-router-dom'

function OptionsHeader() {
  return (
    <header>
        <Link to={`/`}>
            <button className='new__user'>Volver</button>
        </Link>
    </header>
  )
}

export default OptionsHeader
