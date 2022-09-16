import React from 'react'
import './ProjectsHeader.css'
import IconS_vEye from '../icons/IconS_vEye1.png'
import topic from '../icons/topic.png'
import { Link } from 'react-router-dom'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import { blue } from '@mui/material/colors'

function Header() {
	return (
		<header className='App-header-Projects'>
			<div className='ProjectsHeader__left'>
				<img src={IconS_vEye} alt='imagen' />
				<h2>v-Eye Asset Inventory</h2>
				<Link to={`/`}>
					<button className='projectsUsers'>
						<GroupOutlinedIcon className='projectsGroupIcon' />
						Users
					</button>
				</Link>
				<Link to={`/projects`}>
					<button className='projectsHeader'>
						<img src={topic} className='projects__icon' alt='imagen' />
						Projects
					</button>
				</Link>
			</div>
			<div className='ProjectsHeader__right'>
				<Link to={`/new-project`}>
					<button className='new__user'>
						<PersonAddAltOutlinedIcon
							sx={{ color: blue[50] }}
							className='PersonAddIcon'
						/>
						Add Project
					</button>
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
