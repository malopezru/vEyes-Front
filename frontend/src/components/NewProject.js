import React, { useState } from 'react'

function NewProject() {

    const [projectName, setProjectName] = useState("");
    
    const handleSubmit = () => {
        console.log(`${projectName}`)
        alert("El Proyecto ha sido ingresado, presione Volver para regresar a la pantalla de inicio")
    }

    return (  
        <div className='divisor'>
            <h2>Crear Proyecto</h2>
            
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Nombre del Proyecto:</p>
                    <input type="text" name="name" onChange={(e) => setProjectName(e.target.value)}/>
                </label>
            </form>
            
            <div> 
                <input type="submit" value="Submit"  className='submit__button'/>
            </div>
        </div>
  )
}

export default NewProject
