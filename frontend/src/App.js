import './App.css'
import Header from './components/Header'
import Table from './components/Table'
import OptionsHeader from './components/OptionsHeader'
import NewUser from './components/NewUser'
import NewProject from './components/NewProject'
import DeleteProject from './components/DeleteProject'
import ModifyUser from './components/ModifyUser'
import Projects from './components/Projects'
import ProjectsHeader from './components/ProjectsHeader'
import SelectorTest from './components/SelectorTest'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<Header />
								<Table />
							</>
						}
					/>

					<Route
						path='/new-user'
						element={
							<>
								<Header />
								<NewUser />
							</>
						}
					/>

					<Route
						path='/new-project'
						element={
							<>
								<ProjectsHeader />
								<NewProject />
							</>
						}
					/>

					<Route
						path='/delete-project'
						element={
							<>
								<OptionsHeader />
								<DeleteProject />
							</>
						}
					/>

					<Route
						path='/modify-user'
						element={
							<>
								<OptionsHeader />
								<ModifyUser />
							</>
						}
					/>

					<Route
						path='/projects'
						element={
							<>
								<ProjectsHeader />
								<Projects />
							</>
						}
					/>

					<Route path='/projects' element={<>{/* <SelectorTest /> */}</>} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
