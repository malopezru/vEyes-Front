import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import OptionsHeader from './components/OptionsHeader';
import NewUser from './components/NewUser';
import NewProject from './components/NewProject';
import DeleteProject from './components/DeleteProject';
import DataFetching from './components/DataFetching';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<>
            <Header/>
            <Table/></>}/>

          <Route path="/new-user" element={<>
            <OptionsHeader/>
            <NewUser/></>}/>

          <Route path="/new-project" element={<>
            <OptionsHeader/>
            <NewProject/></>}/>

          <Route path="/delete-project" element={<>
            <OptionsHeader/>
            <DeleteProject/></>}/>
            
          <Route path="/modify-user" element={<>
            <OptionsHeader/>
            {/* <DataFetching/> */}</>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
