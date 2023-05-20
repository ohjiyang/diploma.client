import React, {useState, useEffect} from 'react';
import {RiFileAddLine, RiFileSearchLine} from "react-icons/ri";
import axios from "axios";
import ProjectContextMenu from "../UI/ProjectContextMenu";
import ProjectModalCreate from "../UI/ProjectModalCreate";
import ProjectModalAdd from "../UI/ProjectModalAdd";
import ProjectModalEdit from "../UI/ProjectModalEdit";
import ProjectModalDelete from "../UI/ProjectModalDelete";

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
    //Модальные окна
    const [isModalAddActive, setIsModalAddActive] = useState(false)
    const [isModalCreateActive, setIsModalCreateActive] = useState(false)
    const [isModalEditActive, setIsModalEditActive] = useState(false)
    const [isModalDeleteActive, setIsModalDeleteActive] = useState(false)

    const handleOnAddProject = () => {
        setIsModalAddActive(true)
    }

    const handleOnCreateProject = () => {
        setIsModalCreateActive(true)
    }

    const handleOnEditProject = () => {
        setIsModalEditActive(true)
    }

    const handleOnShareProject = () => {
        navigator.clipboard.writeText(project._id)
    }

    const handleOnDeleteProject = () => {
        setIsModalDeleteActive(true)
    }

    return (
        <div className={isMenuActive ? "navigation-active" : "navigation"}>
            <>
                {
                    isModalAddActive && <ProjectModalAdd isActive={isModalAddActive}
                                                         onSetActive={setIsModalAddActive}
                                                         isAuth={isAuth}
                                                         onFetchProjects={handleOnFetchProjects}

                    />
                }
            </>
            <>
                {
                    isModalCreateActive && <ProjectModalCreate isActive={isModalCreateActive}
                                                               onSetActive={setIsModalCreateActive}
                                                               isAuth={isAuth}
                                                               onFetchProjects={handleOnFetchProjects}

                    />
                }
            </>
            <>
                {
                    isModalEditActive && <ProjectModalEdit isActive={isModalEditActive}
                                                           onSetActive={setIsModalEditActive}
                                                           project={project}
                                                           isAuth={isAuth}
                                                           onFetchProjects={handleOnFetchProjects}
                    />
                }
            </>
            <>
                {
                    isModalDeleteActive && <ProjectModalDelete isActive={isModalDeleteActive}
                                                               onSetActive={setIsModalDeleteActive}
                                                               project={project}
                                                               isAuth={isAuth}
                                                               onFetchProjects={handleOnFetchProjects}

                    />
                }
            </>
            <>
                {
                    contextMenu.show && <ProjectContextMenu pageX={contextMenu.x}
                                                            pageY={contextMenu.y}
                                                            onCloseContextMenu={handleCloseContextMenu}
                                                            onEditProject={handleOnEditProject}
                                                            onDeleteProject={handleOnDeleteProject}
                                                            onShareProject={handleOnShareProject}
                    />
                }
            </>
            <div className={"navigation__head"}>
                <button className={"navigation__button"} onClick={handleOnAddProject}>
                    Получить проект
                    <RiFileAddLine size={20}/>
                </button>

                <button className={"navigation__button"} onClick={handleOnCreateProject}>
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