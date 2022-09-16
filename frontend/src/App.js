import './App.css'
import Header from './components/Header'
import Table from './components/Table'
import NewUser from './components/NewUser'
import NewProject from './components/NewProject'
import Projects from './components/Projects'
import ProjectsHeader from './components/ProjectsHeader'
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
						path='/projects'
						element={
							<>
								<ProjectsHeader />
								<Projects />
							</>
						}
					/>
				</Routes>
			</Router>
		</div>
	)
}

export default App
