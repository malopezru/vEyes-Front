import React, { useState, useEffect } from 'react';

function DataFetching() {
    const [data, setData] = useState([])

    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {mode:'cors'});
            const datos = await response.json();
            setData(datos)
            console.log({ datos })
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        makeAPICall();
    }, [])

    return (
        <div>
            <ul>
                {
                    data.map(item => (
                    <li key={item.id}>{item.last_name}</li>
                ))}
            </ul>            
        </div>
    )
    }

export default DataFetching
