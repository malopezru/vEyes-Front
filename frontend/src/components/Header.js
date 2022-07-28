import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Headers.css'
import IconS_vEye from '../icons/IconS_vEye1.png'
import topic from '../icons/topic.png'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { blue } from '@mui/material/colors'

function Header() {
    const [showDelete, setShowDelete] = useState(false)

	const handleSubmit = () => {
        var checkboxes = document.getElementsByName('projects')

        var projects = 0

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                projects = checkboxes[i].value;
            }
        }

        const deleteMethod = {
            method: 'DELETE',
            headers: {
             'Access-Control-Allow-Origin': 'http://localhost:3001',
             'Access-Control-Allow-Credentials': 'true' 
            },
           }

        if (projects !== 0){
            fetch('http://localhost:3000/api/users/' + projects, deleteMethod)
            .then(res => res.json())
            .then(res => console.log(res))
            alert("Los Proyectos seleccionados ha sido eliminados, presione Volver para regresar a la pantalla de inicio")
        } else {
            alert("Seleccione un proyecto")
        }
    }

	return (
		<div>
		<header className='App-header'>
			<div className='header__left'>
				<img src={IconS_vEye} alt='imagen' />
				<h2>v-Eye Asset Inventory</h2>
				<Link to={`/`}>
					<button className='users'>
					<GroupOutlinedIcon className='GroupIcon' />Users</button>
				</Link>
				<Link to={`/projects`}>
					<button className='headerProjectsButton'>
					<img src={topic} className='projects__icon' alt='imagen' />Projects</button>
				</Link>
			</div>
			<div className='header__right'>
				<Link to={`/new-user`}>
					<button className='new__user'>
					<PersonAddAltOutlinedIcon className='PersonAddIcon'	/>Add User</button>
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
		<div>
			{ showDelete ? 
        <div>
            <div className='delete__view'></div>
                
            <div className='delete__divisor'>
                <h2>Delete User</h2>
                

                <form className='deleteUser__form' onSubmit={handleSubmit}>
                    <label className='delete__label'>
                        <p>Are you sure you want to delete these users?</p>
                    </label>
                    <input type="submit" value="Submit"  className='deleteSubmitButton'/>
                    <button className='cancel' onClick={() => setShowDelete(false)}>Cancel</button>
                </form>

            </div>
            <div>
            </div>
            
        </div>: null}
		</div>
		</div>
	)
}

export default Header
