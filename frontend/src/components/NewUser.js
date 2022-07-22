import React, { useState, useEffect } from 'react'
import './NewUser.css'

function NewUser() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [checkList, setCheckList] = useState([])
    const [projectsInfo, setProjectsInfo] = useState({ projects:[], response:[] });

    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {mode:'cors'});
            const datos = await response.json();
            setCheckList(datos.projects)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        makeAPICall();
    }, [])
    
    const handleSubmit = () => {
        const first_name = `${name}`
        const last_name = `${lastName}`
        const username = `${userName}`

        var checkboxes = document.getElementsByName('projects')

        const projects = []

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                projects.push(checkboxes[i].value);
            }
        }

        
        const data = {first_name, last_name, username, projects}
            
        PostData(data);
        
        
        if(first_name && lastName && userName && projects){
            alert("El Usuario ha sido ingresado, presione Volver para regresar a la pantalla de inicio")
        } else {
            alert("Ingrese toda la información")
        }
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
                    <input type="text" name="userName" onChange={(e) => setUserName(e.target.value)}/>
                </label>

                <label>
                    <p>Proyectos a los que va a tener acceso:</p>
                    {checkList.map((item, index) => (
                        <div key={index}>
                            <input value={checkList[index].project_name} name="projects" id={checkList[index].id} type="checkbox" onChange={handleChange}/>
                            <span>{checkList[index].project_name}</span>
                        </div>
                        ))}
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
