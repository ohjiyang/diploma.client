import React, {useState, useEffect} from 'react';
import {RiFileAddLine, RiFileSearchLine} from "react-icons/ri";
import axios from "axios";

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

    return (
        <div className={isMenuActive ? "navigation-active" : "navigation"}>
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
                        <button key={index} className={"navigation__project"}>
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