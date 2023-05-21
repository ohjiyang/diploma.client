import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import {useState} from "react";
import Review from "./pages/Review";
import Board from "./pages/Board";
import Monitoring from "./pages/Monitoring";

function App() {
    const [currentProject, setCurrentProject] = useState({})

    const handleOnLoadProject = (project) => {
        setCurrentProject(project)
    }
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Layout currentProject={currentProject} onLoadProject={handleOnLoadProject}/>}>
                    <Route index element={<Review/>}></Route>
                    <Route path={"/board"} element={<Board/>}></Route>
                    <Route path={"/monitoring"} element={<Monitoring/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
