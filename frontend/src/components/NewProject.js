import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { ProjectsColumns } from './ProjectsColumns.js'
import GlobalFilter from './GlobalFilter'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

function NewProject() {
	const [projectName, setProjectName] = useState('')
	const [projectLocation, setProjectLocation] = useState('')
	const [userData, setUserData] = useState([])
	const nameRef = useRef(null)

	const makeAPICall = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/users', {
				mode: 'cors',
			})
			const datos = await response.json()
			setUserData(datos.projects)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		makeAPICall()
	}, [])

	const columns = useMemo(() => ProjectsColumns, [])

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

	const handleSubmit = () => {
		const project_name = `${projectName}`
		const location = `${projectLocation}`
		const data = { project_name, location }

		PostData(data)

		alert(
			'El Proyecto ha sido ingresado, presione Volver para regresar a la pantalla de inicio'
		)
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
					<Link to={`/projects`}>
						<CloseIcon className='CloseIcon' />
					</Link>
					<h2 className='h2AddUser__header'>Add Project</h2>
				</div>
				<label>
					<p>Name</p>
					<input
						ref={nameRef}
						className='addUserInput'
						type='text'
						name='name'
						onChange={(e) => setProjectName(e.target.value)}
					/>
				</label>
				<label>
					<p>Location</p>
					<input
						ref={nameRef}
						className='addUserInput'
						type='text'
						name='name'
						onChange={(e) => setProjectLocation(e.target.value)}
					/>
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
		</div>
	)
}

export default NewProject
