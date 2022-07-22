import React, { useState } from 'react'

function NewProject() {

    const [projectName, setProjectName] = useState("");
    
    const handleSubmit = () => {
        console.log(`${projectName}`)
        const project_name = `${projectName}`
        const data = {project_name}
            
        PostData(data);
        
        alert("El Proyecto ha sido ingresado, presione Volver para regresar a la pantalla de inicio")
    }

    function PostData(datos) {
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            mode:'cors',
            body: JSON.stringify(datos),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json, text/plain, */*", 
                'Content-Type':'application/json'}
        })
        .then(response => response.json())
        .catch(err => console.log(err));
    }

    return (  
        <div className='divisor'>
            <h2>Crear Proyecto</h2>
            
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Nombre del Proyecto:</p>
                    <input type="text" name="name" onChange={(e) => setProjectName(e.target.value)}/>
                </label>
                <div> 
                    <input type="submit" value="Submit"  className='submit__button'/>
                </div>
            </form>
            
        </div>
  )
}

export default NewProject
