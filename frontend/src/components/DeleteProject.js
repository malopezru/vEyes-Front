import React, { useState,useEffect } from 'react'

function DeleteProject() {

    const [projectsInfo, setProjectsInfo] = useState({ projects:[], response:[] });
    const [checkList, setCheckList] = useState([])
    const array = []

    
    
    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {mode:'cors'});
            const datos = await response.json();
            const projects = datos.projects
            setCheckList(projects)
        }catch (e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        makeAPICall();
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        var checkboxes = document.getElementsByName('projects')

        var projects = 0

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                projects = checkboxes[i].value;
            }
        }

        const deleteMethod = {
            method: 'DELETE',
            headers: {
             'Access-Control-Allow-Origin': 'http://localhost:3001',
             'Access-Control-Allow-Credentials': 'true' 
            },
           }

        if (projects != 0){
            console.log(projects)
            fetch('http://localhost:3000/api/users/' + projects, deleteMethod)
            .then(res => res.json())
            .then(res => console.log(res))
            alert("Los Proyectos seleccionados ha sido eliminados, presione Volver para regresar a la pantalla de inicio")
        } else {
            alert("Seleccione un proyecto")
        }
    }

    const handleChange = (event) => {
        const { value, checked } = event.target;
        const { projects } = projectsInfo;
        /* console.log(`${value} is ${checked}`); */

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
                        {checkList.map((item, index) => (
                        <div key={index}>
                            <input value={checkList[index].id} name="projects" id={checkList[index].id} type="radio" onChange={handleChange}/>
                            <span>{checkList[index].project_name}</span>
                        </div>
                        ))}
                    </label>
                <div> 
                    <input type="submit" value="Submit"  className='submit__button'/>
                </div>
            </form>

        </div>
  )
}

export default DeleteProject