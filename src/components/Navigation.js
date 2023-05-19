import React, {useState, useEffect} from 'react';
import {RiFileAddLine, RiFileSearchLine} from "react-icons/ri";
import axios from "axios";
import ProjectContextMenu from "../UI/ProjectContextMenu";

const Navigation = ({isAuth, isMenuActive}) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (isAuth) {
            handleOnFetchProjects()
        } else {
            setProjects([])
        }
    }, [isAuth])

    const handleOnFetchProjects = () => {
        setTimeout(() => {
            const token = localStorage.getItem("JWT")
            axios.get("http://localhost:4444/projects", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setProjects(response.data.projects)
            })
        }, 500)
    }

    //Контекстное меню
    const [project, setProject] = useState([])
    const [contextMenu, setContextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
    })

    const handleShowContextMenu = (e, project) => {
        e.preventDefault()
        setProject(project)
        const {pageX, pageY} = e
        setContextMenu({show: true, x: pageX, y: pageY})
    }

    const handleCloseContextMenu = () => {
        setContextMenu({show: false, x: 0, y: 0})
    }

    return (
        <div className={isMenuActive ? "navigation-active" : "navigation"}>
            <>
                {
                    contextMenu.show && <ProjectContextMenu pageX={contextMenu.x}
                                                            pageY={contextMenu.y}
                                                            onCloseContextMenu={handleCloseContextMenu}
                    />
                }
            </>
            <div className={"navigation__head"}>
                <button className={"navigation__button"}>
                    Получить проект
                    <RiFileAddLine size={20}/>
                </button>

                <button className={"navigation__button"}>
                    Создать проект
                    <RiFileSearchLine size={20}/>
                </button>
            </div>
            <div className={"navigation__body"}>
                {
                    projects.map((project, index) => (
                        <button key={index} className={"navigation__project"}
                                onContextMenu={(e) => handleShowContextMenu(e, project)}
                        >
                            {
                                project.title
                            }
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default Navigation;