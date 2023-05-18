import React, {useState} from 'react';
import {RiFileAddLine, RiFileSearchLine} from "react-icons/ri";

const Navigation = ({isMenuActive}) => {
    const [projects, setProjects] = useState([])

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