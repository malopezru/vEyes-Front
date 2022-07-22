import React, {useState, useEffect} from 'react'

function ModifyUser() {
    const [projectsInfo, setProjectsInfo] = useState({ projects:[], response:[] });
    const [usersInfo, setUsersInfo] = useState({ users:[], response:[] });
    const [namePlaceholder, setNamePlaceholder] = useState("");
    const [lastNamePlaceholder, setLastNamePlaceholder] = useState("");
    const [usernamePlaceholder, setUsernamePlaceholder] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [checkList, setCheckList] = useState([])
    const [radioList, setRadioList] = useState([])



    const makeAPICall = async () => {
        try {
            setNamePlaceholder("")
            setLastNamePlaceholder("")
            setUsernamePlaceholder("")
            const response = await fetch('http://localhost:3000/api/users', {mode:'cors'});
            const datos = await response.json();
            const users = datos.users
            setRadioList(users)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        makeAPICall();
    }, [])

    const handleSubmit = () => {
        var checkboxes = document.getElementsByName('projects')
        var radioValue = document.getElementsByName('users')

        const first_name = `${name}`
        const last_name = `${lastName}`
        const username = `${userName}`

        const projects = []

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                projects.push(checkboxes[i].value);
            }
        }

        var userId = 0

        for (i = 0; i < radioValue.length; i++) {
            if (radioValue[i].checked) {
                userId = radioValue[i].value;
            }
        }
        
        const data = {first_name, last_name, username, projects}
            
        PutData(userId, data);
        
        alert("El Usuario ha sido modificado, presione Volver para regresar a la pantalla de inicio")
    }

    
    function PutData(id, datos) {
        fetch('http://localhost:3000/api/users/' + id, {
            method: 'PUT',
            mode:'cors',
            body: JSON.stringify(datos),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json, text/plain, */*", 
                'Content-Type':'application/json'}
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }


    const handleChange = (event) => {
        const { value, checked } = event.target;
        const { users } = usersInfo;
        /* console.log(`${value} is ${checked}`); */

        if (checked) {
            setUsersInfo({
                users: [...users, value],
                response: [...users, value],
            });

            ShowUserData(value)

        }else {
            setUsersInfo({
                users: users.filter((e) => e !== value),
                response: users.filter((e) => e !== value)
            });
          }
    }

    async function ShowUserData(value) {
        try {
            const response = await fetch('http://localhost:3000/api/users/' + value);
            const datos = await response.json();
            console.log(datos)
            setNamePlaceholder(datos.first_name)
            setLastNamePlaceholder(datos.last_name)
            setUsernamePlaceholder(datos.username)

            const responseProjects = await fetch('http://localhost:3000/api/users', {mode:'cors'});
            const datosProjects = await responseProjects.json();
            setCheckList(datosProjects.projects)

        }catch (e) {
            console.log(e)
        }
    }

    const handleCheckListChange = (event) => {
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

            <h2>Modificar Usuario</h2>

            <form onSubmit={handleSubmit}>
                <label>
                        <p>Seleccione el usuario a modificar:</p>
                        {radioList.map((item, index) => (
                        <div key={index}>
                            <input value={radioList[index].id} name="users" id={radioList[index].id} type="radio" onChange={handleChange}/>
                            <span>{radioList[index].username}</span>
                        </div>
                        ))}
                    </label>

                    <label>
                    <p>Nombre:</p>
                    <input type="text" placeholder={namePlaceholder} name="name" onChange={(e) => setName(e.target.value)}/>
                </label>

                <label>
                    <p>Apellido:</p>
                    <input type="text" placeholder={lastNamePlaceholder} name="lastName" onChange={(e) => setLastName(e.target.value)}/>
                </label>

                <label>
                    <p>Nombre de Usuario</p>
                    <input type="text" placeholder={usernamePlaceholder} name="userName" onChange={(e) => setUserName(e.target.value)}/>
                </label>

                <label>
                    <p>Proyectos a los que va a tener acceso:</p>
                    {checkList.map((item, index) => (
                        <div key={index}>
                            <input value={checkList[index].project_name} name="projects" id={checkList[index].id} type="checkbox" onChange={handleCheckListChange}/>
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

export default ModifyUser
