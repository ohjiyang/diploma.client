import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import {useState} from "react";

function App() {
    const [currentProject, setCurrentProject] = useState({})

    const handleOnLoadProject = (project) => {
        setCurrentProject(project)
    }
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Layout currentProject={currentProject} onLoadProject={handleOnLoadProject}/>}>

                </Route>
            </Routes>
        </div>
    );
}

export default App;
