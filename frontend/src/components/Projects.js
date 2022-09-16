import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { ProjectsColumns } from './ProjectsColumns.js'
import GlobalFilter from './GlobalFilter.js'
import './Table.css'

function Table() {
	const [userData, setUserData] = useState([])

	const makeAPICall = async () => {
		try {
			const response = await fetch('http://localhost/3dves/customerData/projects', {
				mode: 'cors',
			})
			const datos = await response.json()
			setUserData(datos)
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

	return (
		<div className='view'>
			<>
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				<table className='table' {...getTableProps()}>
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
		</div>
	)
}

export default Table
