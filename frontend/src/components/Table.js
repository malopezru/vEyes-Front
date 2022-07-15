import React, { useMemo, useState, useEffect } from 'react'
import { useTable } from 'react-table'
import { Columns } from './Columns.js'
import './Table.css'

function Table() {

    const [userData, setUserData] = useState([])

    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {mode:'cors'});
            const datos = await response.json();
            setUserData(datos.users)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        makeAPICall();
    }, [])

    const columns = useMemo(() => Columns, [])
    const data = useMemo(() => userData, [])

    const tableInstance = useTable({
        columns: columns,
        data: userData
    })

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows,
        prepareRow
    } = tableInstance 




    return (
        <div className='view'>
            <table  className='table' {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                            </tr>
                        ))}
                </thead>
        <tbody className='table__body' {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
            </table>
            {/* <table className='table'>
                <thead>
                <tr className="table__header">
                    <th className='header__1'>Usuario</th>
                    <th className='header__2'>Proyectos</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='header__1'>1</td>
                        <td className='column__2'>2</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    )
}

export default Table
