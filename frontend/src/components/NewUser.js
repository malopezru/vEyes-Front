import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import SelectorTest from './SelectorTest.js'
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
	const [projectsInfo, setProjectsInfo] = useState({
		projects: [],
		response: [],
	})

	const makeAPICall = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/users', {
				mode: 'cors',
			})
			const datos = await response.json()
			setCheckList(datos.projects)
			setUserData(datos.users)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		makeAPICall()
	}, [])

	const handleSubmit = (e) => {
		const first_name = `${name}`
		const last_name = `${lastName}`
		const username = `${userName}`

		var checkboxes = document.getElementsByName('projects')

		const projects = []

		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				projects.push(checkboxes[i].value)
			}
		}

		const data = { first_name, last_name, username, projects }

		if (first_name && lastName && userName && projects) {
			PostData(data)
			setOpen(true)
			e.preventDefault()
			nameRef.current.value = ''
			lastNameRef.current.value = ''
			usernameRef.current.value = ''
		} else {
			setOpenError(true)
			e.preventDefault()
		}
		makeAPICall()
	}

	const handleChange = (event) => {
		const { value, checked } = event.target
		const { projects } = projectsInfo
		console.log(`${value} is ${checked}`)

		if (checked) {
			setProjectsInfo({
				projects: [...projects, value],
				response: [...projects, value],
			})
		} else {
			setProjectsInfo({
				projects: projects.filter((e) => e !== value),
				response: projects.filter((e) => e !== value),
			})
		}
	}

	function PostData(datos) {
		fetch('http://localhost:3000/api/users', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(datos),
			headers: {
				'Access-Control-Allow-Origin': '*',
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
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
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</>
			<form>
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
					{/* <select
						id='selectList'
						className='select__list'
						placeholder='Select Projects'>
						{checkList.map((item, index) => (
							<option key={index}>
								<input
									value={checkList[index].project_name}
									name='projects'
									id={checkList[index].id}
									type='checkbox'
									onChange={handleChange}
								/>
								<span>{checkList[index].project_name}</span>
							</option>
						))}
					</select> */}
					<hr />
				</label>
				<div>
					<input
						type='submit'
						value='Save'
						className='submit__button'
						onClick={handleSubmit}
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
			</div>
		</div>
	)
}

export default NewUser
