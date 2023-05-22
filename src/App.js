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

    const [isMenuActive, setIsMenuActive] = useState(false)

    const handleOnToggleMenu = () => {
        setIsMenuActive(prevState => !prevState)
    }

    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Layout isMenuActive={isMenuActive}
                                                   onToggleMenu={handleOnToggleMenu}
                                                   currentProject={currentProject}
                                                   onLoadProject={handleOnLoadProject}
                />}>
                    <Route index element={<Review currentProject={currentProject}/>}></Route>
                    <Route path={"/board"} element={<Board isMenuActive={isMenuActive}
                                                           currentProject={currentProject}
                    />}></Route>
                    <Route path={"/monitoring"} element={<Monitoring currentProject={currentProject}/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
