import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import { TableCheckbox } from './TableCheckbox.js'
import { Columns } from './Columns.js'
import { Link } from 'react-router-dom'
import { blue } from '@mui/material/colors'
import { Collapse } from '@mui/material'
import './Headers.css'
import './Table.css'
import IconS_vEye from '../icons/IconS_vEye1.png'
import topic from '../icons/topic.png'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import GlobalFilter from './GlobalFilter.js'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

function Table() {

    const [userData, setUserData] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    const [editUser, setEditUser] = useState(false)
	const nameRef = useRef(null)
	const lastNameRef = useRef(null)
	const usernameRef = useRef(null)
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [userName, setUserName] = useState('')
    const [userProjects, setUserProjects] = useState('')
    const [id, setId] = useState('')
	const [open, setOpen] = useState(false)
	const [openError, setOpenError] = useState(false)
	const [projectName, setProjectName] = useState([]);
	const [checkList, setCheckList] = useState([])
    const [editButton, setEditButton] = useState({display: 'none'})
	const names = [];

    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {mode:'cors'});
            const datos = await response.json();
			setCheckList(datos.projects)
            setUserData(datos.users)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        makeAPICall();
    }, [])

    
	for(var i = 0; i < checkList.length; i++){
		names.push(checkList[i].project_name)
	} 

    const columns = useMemo(() => Columns, [])

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        selectedFlatRows
    } = useTable({
        columns: columns,
        data: userData,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
        hooks.visibleColumns.push((columns) => {
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (<TableCheckbox {...getToggleAllRowsSelectedProps()} />),
                    Cell: ({ row }) => (<><TableCheckbox {...row.getToggleRowSelectedProps()}/></>),
                },
                ...columns
            ]
        })
    }) 

    const { globalFilter } = state
    var selectedUsers = selectedFlatRows
    var selectedIds = []

    for (i = 0; i < selectedUsers.length; i++){
        selectedIds.push(selectedUsers[i].original.id)
    }

    const handleSubmit = (e) => {
        console.log(selectedIds)
        const deleteMethod = {
            method: 'DELETE',
            headers: {
             'Access-Control-Allow-Origin': 'http://localhost:3001',
             'Access-Control-Allow-Credentials': 'true' 
            },
        }

        if (selectedIds.length !== 0){
            for(var i = 0; i < selectedIds.length; i++){
                fetch('http://localhost:3000/api/users/' + selectedIds[i], deleteMethod)
                .then(res => res.json())
                .then(res => console.log(res))
            }
            alert("Selected users have been deleted")
        } else {
            alert("Select a User")
        }
    }

    const handleEditClick = (e, row) => {
        e.preventDefault()
        setEditUser(true)
        nameRef.current = row.original.first_name
        lastNameRef.current = row.original.last_name
        usernameRef.current = row.original.username
        setId(row.original.id)
        setName(row.original.first_name)
        setLastName(row.original.last_name)
        setUserName(row.original.username)
        setUserProjects(row.original.projects)
        console.log(userProjects)
    }

    const handleEditSubmit = (e) => {
        const first_name = `${name}`
        const last_name = `${lastName}`
        const username = `${userName}`
		const projects = projectName
        e.preventDefault()

        const data = {first_name, last_name, username, projects}
            
        PutData(id, data);
    }

    function PutData(id, datos) {
        fetch('http://localhost:3000/api/users/' + id, {
            method: 'PUT',
            mode:'cors',
            body: JSON.stringify(datos),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json, text/plain, */*", 
                'Content-Type':'application/json'}
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleUsernameChange = (e) => {
        setUserName(e.target.value)
    }

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
			},
		},
	};

	const handleProjectChange = (event) => {
		const {
		  target: { value },
		} = event;
		setProjectName(
		  typeof value === 'string' ? value.split(',') : value,
		);
	  };

    return (
        <div  className='view'>
            
            <div>
		<header className='App-header'>
			<div className='header__left'>
				<img src={IconS_vEye} alt='imagen' />
				<h2>v-Eye Asset Inventory</h2>
				<Link to={`/`}>
					<button className='users'>
					<GroupOutlinedIcon className='GroupIcon' />
                    Users</button>
				</Link>
				<Link to={`/projects`}>
					<button className='projects'>
					<img src={topic} className='projects__icon' alt='imagen' />
                    Projects</button>
				</Link>
			</div>
			<div className='header__right'>
					<button className='delete__user' onClick={() => setShowDelete(true)}>
					<DeleteOutlinedIcon	className='DeleteIcon' />Delete</button>
				<Link to={`/new-user`}>
					<button className='new__user'>
					<PersonAddAltOutlinedIcon className='PersonAddIcon'	/>Add User</button>
				</Link>
			</div>
		</header>
		</div>

            <>
            <div className='selectedRows'>
                {selectedFlatRows.length} Selected
            </div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                <table  className='table' {...getTableProps()}
                        onMouseEnter={e => {
                            setEditButton({display: 'inline-block'})
                        }}
                        onMouseLeave={e => {
                            setEditButton({display: 'none'})
                        }}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? ' ↑' : ' ↓'): ''}    
                                                </span>
                                            </th>
                                        ))}
                                </tr>
                            ))}
                    </thead>
                    <tbody className='table__body' {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            <td><Checkbox {...row.getToggleRowSelectedProps()}/></td>
                            <td><EditOutlinedIcon style={editButton} className='EditIcon' onClick={(e) => handleEditClick(e, row)}/>{row.original.first_name}</td>
                            <td>{row.original.last_name}</td>
                            <td>{row.original.username}</td>
                            {row.original.projects.length <= 3 && 
                            <td>{row.original.projects.join(", ")} </td>}
                            {row.original.projects.length > 3 &&
                            <td>{row.original.projects[0]}, {row.original.projects[1]}, {row.original.projects[2]}... <b>+{row.original.projects.length-3}</b></td>}
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
		<div>
            { editUser ? 
            <div><form className='addUser__form'>
            <div className='AddUser__header'>
                    <CloseIcon className='CloseIcon' onClick={() => setEditUser(false)}/>
                <h2 className='h2AddUser__header'>Edit User</h2>
            </div>
            <label>
                <p>Name</p>
                <input
                    className='addUserInput'
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                />
            </label>
        
            <label>
                <p>Last Name</p>
                <input
                    className='addUserInput'
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={(e) => handleLastNameChange(e)}
                />
            </label>
        
            <label>
                <p>Username</p>
                <input
                    className='addUserInput'
                    type='text'
                    name='userName'
                    value={userName}
                    onChange={(e) => handleUsernameChange(e)}
                />
            </label>
        
            <label>
                <p>Assign projects</p>
                <div>
					  <FormControl sx={{ m: 1, width: 300}}>
						<InputLabel id="multiple-checkbox">{userProjects.join(', ')}</InputLabel>
						<Select
						  labelId="multiple-checkbox"
						  id="project-selected"
						  multiple
						  value={projectName}
						  onChange={handleProjectChange}
						  input={<OutlinedInput label="Projects" />}
						  renderValue={(selected) => selected.join(', ')}
						  MenuProps={MenuProps}
						>
						  {names.map((project) => (
							<MenuItem key={project} value={project}>
							  <Checkbox checked={projectName.indexOf(project) > -1} />
							  <ListItemText primary={project} />
							</MenuItem>
						  ))}
						</Select>
					  </FormControl>
					</div>
                <hr />
            </label>
            <div>
                <input
                    type='submit'
                    value='Save'
                    className='submit__button'
                    onClick={(e) => { handleEditSubmit(e) } }
                />
                {/* <SelectorTest /> */}
            </div>
        </form>
        <div className='Stack'>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={() => {
                                    setOpen(false)
                                }}>
                                <CloseIcon fontSize='inherit' />
                            </IconButton>
                        }
                        variant='filled'
                        severity='success'>
                        User Added Successfully
                    </Alert>
                </Collapse>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Collapse in={openError}>
                    <Alert
                        action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={() => {
                                    setOpenError(false)
                                }}>
                                <CloseIcon fontSize='inherit' />
                            </IconButton>
                        }
                        variant='filled'
                        severity='error'>
                        Error! Please fill in all fields
                    </Alert>
                </Collapse>
            </Box>
        </div></div>
         : null}
			{ showDelete ? 
            <div>
                <div className='delete__view'>
                </div>
                    <div className='delete__divisor'>
                    
                    <div className='deleteAlert'>
                        <DeleteOutlinedIcon className='alertDeleteIcon'/>
                        <h3 className='alertTitle'>Delete User</h3>
                    </div>
                        

                        <form className='deleteUser__form' onSubmit={handleSubmit}>
                            <label className='delete__label'>
                                <p className='deleteP'>Are you sure you want to delete these users?</p>
                            </label>
                            <div className='deleteButtons'>
                                <input type="submit" value="Delete"  className='deleteSubmitButton'/>
                                <button className='cancel' onClick={() => setShowDelete(false)}>Cancel</button>
                            </div>
                        </form>

                    </div>  
                                  
            </div>: null}
        </div>
        </div>
        
    )
}

export default Table
