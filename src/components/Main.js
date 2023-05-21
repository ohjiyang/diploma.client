import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {RiCloseLine} from "react-icons/ri";

const Main = ({currentProject, onLoadProject}) => {
    const handleOnCloseProject = () => {
        onLoadProject({})
    }

    return (
        <div className={"main"}>
            <div className={"main__head"}>
                <div className={"main__title"}>
                    {
                        currentProject.title
                    }
                </div>
                <div className={"main__buttons"}>
                    <button className={"main__button"} onClick={handleOnCloseProject}>
                        <RiCloseLine size={35}/>
                    </button>
                </div>
            </div>
            <div className={"main__navlinks"}>
                <NavLink to={"/"}
                         className={({isActive}) => isActive ? "main__navlink-active" : "main__navlink"}>Обзор</NavLink>
                <NavLink to={"/board"}
                         className={({isActive}) => isActive ? "main__navlink-active" : "main__navlink"}>Доска</NavLink>
                <NavLink to={"/monitoring"}
                         className={({isActive}) => isActive ? "main__navlink-active" : "main__navlink"}>Мониторинг</NavLink>
            </div>
            <div className={"main__body"}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Main;