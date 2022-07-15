import React from 'react'
import './Headers.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    
    <header className="App-header">
        <Link to={`/new-user`}>
            <button className='new__user'>Crear Usuario</button>
        </Link>
        <Link to={`/new-project`}>
            <button className='new__project'>Agregar Proyecto</button>
            </Link>
        <Link to={`/delete-project`}>
            <button className='delete__project'>Eliminar Proyecto</button>
        </Link>
        <Link to={`/modify-user`}>
            <button className='modify__user'>Modificar Usuario</button>
        </Link>
    </header>
  )
}

export default Header
