import React, { useState } from 'react'
import './NewUser.css'

function NewUser() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [projectsInfo, setProjectsInfo] = useState({ projects:[], response:[] });
    
    const handleSubmit = () => {
        console.log(`${name}`)
        console.log(`${lastName}`)
        console.log(`${username}`)
        console.log(`${projectsInfo}`)
        alert("El Usuario ha sido ingresado, presione Volver para regresar a la pantalla de inicio")
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
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Nombre:</p>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                </label>

                <label>
                    <p>Apellido:</p>
                    <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}/>
                </label>

                <label>
                    <p>Nombre de Usuario</p>
                    <input type="text" name="username" onChange={(e) => setUserName(e.target.value)}/>
                </label>

                <label>
                    <p>Proyectos a los que va a tener acceso:</p>
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

export default NewUser
