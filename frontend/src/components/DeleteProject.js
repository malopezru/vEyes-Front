import React, { useState } from 'react'

function DeleteProject() {

    const [projectsInfo, setProjectsInfo] = useState({ projects:[], response:[] });
    
    const handleSubmit = () => {
        console.log(`${projectsInfo}`)
        alert("Los Proyectos ha sido eliminados, presione Volver para regresar a la pantalla de inicio")
    }

    const handleChange = (event) => {
        const { value, checked } = event.target;
        const { projects } = projectsInfo;
        console.log(`${value} is ${checked}`);

        if (checked) {
            setProjectsInfo({
                projects: [...projects, value],
                response: [...projects, value]
            });
        }else {
            setProjectsInfo({
                projects: projects.filter((e) => e !== value),
                response: projects.filter((e) => e !== value)
            });
          }
    }

    return (  
        <div className='divisor'>

            <h2>Eliminar Proyecto</h2>

            <form onSubmit={handleSubmit}>
                <label>
                        <p>Proyectos que van a ser eliminados:</p>
                        <input type="checkbox" name="Proyecto1" value="Proyecto1" onChange={handleChange}/>Proyecto1
                        <hr/>
                        <textarea
                            className="form-control text"
                            name="response"
                            value={projectsInfo.response}
                            placeholder="The checkbox values will be displayed here "
                            id="floatingTextarea2"
                            style={{ height: "150px" }}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                <div> 
                    <input type="submit" value="Submit"  className='submit__button'/>
                </div>
            </form>

        </div>
  )
}

export default DeleteProject