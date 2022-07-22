import React from 'react'
import './Headers.css'
import IconS_vEye from '../icons/IconS_vEye1.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    
    <header className="App-header">
        <div className='header__left'>
            <img src={IconS_vEye} alt="imagen" />
            <h2>v-Eye Asset Inventory</h2>
            <Link to={`/`}>
                <button className='users'>Users</button>
            </Link>
            <Link to={`/projects`}>
                <button className='projects'>Projects</button>
            </Link>
        </div>
        <div className='header__right'>
            <Link to={`/new-user`}>
                <button className='new__user'>Add User</button>
            </Link>
        </div>
        {/* <Link to={`/new-project`}>
            <button className='new__project'>Agregar Proyecto</button>
            </Link>
        <Link to={`/delete-project`}>
            <button className='delete__project'>Eliminar Proyecto</button>
        </Link>
        <Link to={`/modify-user`}>
            <button className='modify__user'>Modificar Usuario</button>
        </Link> */}
    </header>
  )
}

export default Header
