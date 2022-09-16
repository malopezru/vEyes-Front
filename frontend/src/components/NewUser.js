import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { Columns } from './Columns.js'
import { Link } from 'react-router-dom'
import GlobalFilter from './GlobalFilter.js'
import './Table.css'
import './NewUser.css'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { Collapse } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

function NewUser() {
	const [name, setName] = useState('')
	const [userData, setUserData] = useState([])
	const [lastName, setLastName] = useState('')
	const [userName, setUserName] = useState('')
	const [checkList, setCheckList] = useState([])
	const nameRef = useRef(null)
	const lastNameRef = useRef(null)
	const usernameRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [openError, setOpenError] = useState(false)
	const [projectName, setProjectName] = useState([]);
	const names = [];

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


	const makeAPICall = async () => {
		try {
			const response = await fetch('https://energydashboard.3dves.com:3090/3dves/user', {
				mode: 'cors',
				headers: {
					'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsIm5hbWUiOiJNYXJpY29wYSIsImlhdCI6MTY2MjE1MDMwMSwiZXhwIjoxNjYzMzU5OTAxfQ.ah-5_yDThcjM-l648vkDmyPS7O9mQoBN3UOaEc2xzUM",
				}
			})
			const data = await response.json()

            let checkListArray = data.map(user => {return user.projects})
            setCheckList(checkListArray)
			setUserData(data)
		} catch (e) {
			console.log(e)
		}
	}

	for(var i = 0; i < checkList.length; i++){
		names.push(checkList[i])
	} 

	useEffect(() => {
		makeAPICall()
	}, [])

	const handleSubmit = (e) => {
		let first_name = `${name}`
		let last_name = `${lastName}`
		let username = `${userName}`

		const projects = projectName

		const data = { first_name, last_name, username, projects }

		if (name && lastName && userName && projects) {
			PostData(data)
			setOpen(true)
			e.preventDefault()
			makeAPICall()
			nameRef.current.value = ''
			lastNameRef.current.value = ''
			usernameRef.current.value = ''
			setName('')
			setLastName('')
			setUserName('')
		} else {
			setOpenError(true)
			e.preventDefault()
		}
		makeAPICall()
	}
	
	const handleProjectChange = (event) => {
		const {
		  target: { value },
		} = event;
		setProjectName(
		  typeof value === 'string' ? value.split(',') : value,
		);
	  };

	function PostData(datos) {
		fetch('https://energydashboard.3dves.com:3090/3dves/user', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(datos),
			headers: {
				'Access-Control-Allow-Origin': '*',
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsIm5hbWUiOiJNYXJpY29wYSIsImlhdCI6MTY2MjE1MDMwMSwiZXhwIjoxNjYzMzU5OTAxfQ.ah-5_yDThcjM-l648vkDmyPS7O9mQoBN3UOaEc2xzUM",
			},
		})
			.then((response) => response.json())
			.catch((err) => console.log(err))
	}

	const columns = useMemo(() => Columns, [])

	const tableInstance = useTable(
		{
			columns: columns,
			data: userData,
		},
		useGlobalFilter,
		useSortBy
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		setGlobalFilter,
	} = tableInstance

	const { globalFilter } = state

	return (
		<div className='newUser__div'>
			<>
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				<table className='addUserTable' {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render('Header')}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? ' ↑'
													: ' ↓'
												: ''}
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
                            <td>{row.original.name}</td>
                            <td>{row.original.lastName}</td>
                            <td>{row.original.user}</td>
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
			<form className='addUser__form'>
				<div className='AddUser__header'>
					<Link to={`/`}>
						<CloseIcon className='CloseIcon' />
					</Link>
					<h2 className='h2AddUser__header'>Add User</h2>
				</div>
				<label>
					<p>Name</p>
					<input
						ref={nameRef}
						className='addUserInput'
						type='text'
						name='name'
						onChange={(e) => setName(e.target.value)}
					/>
				</label>

				<label>
					<p>Last Name</p>
					<input
						ref={lastNameRef}
						className='addUserInput'
						type='text'
						name='lastName'
						onChange={(e) => setLastName(e.target.value)}
					/>
				</label>

				<label>
					<p>Username</p>
					<input
						ref={usernameRef}
						className='addUserInput'
						type='text'
						name='userName'
						onChange={(e) => setUserName(e.target.value)}
					/>
				</label>

				<label>
					<p>Assign projects</p>
					<hr />
				</label>
				<div>
					<input
						type='submit'
						value='Save'
						className='submit__button'
						onClick={(e) => { handleSubmit(e) } }
					/>

					<div>
					  <FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel id="multiple-checkbox">Tag</InputLabel>
						<Select
						  labelId="multiple-checkbox"
						  id="project-selected"
						  multiple
						  value={projectName}
						  onChange={handleProjectChange}
						  input={<OutlinedInput label="Tag" />}
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
			</div>
		</div>
	)
}

export default NewUser
