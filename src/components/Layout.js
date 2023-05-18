import React, {useState} from 'react';
import {RiMenuFill} from "react-icons/ri";
import Navigation from "./Navigation";
import Instruction from "./Instruction";
import Main from "./Main";

const Layout = () => {
    const [isAuth, setIsAuth] = useState(false)

    const handleOnLogin = () => {
        setIsAuth(true)
    }

    const handleOnLogout = () => {
        setIsAuth(false)
    }

    const [isMenuActive, setIsMenuActive] = useState(false)

    const handleOnToggleMenu = () => {
        setIsMenuActive(prevState => !prevState)
    }

    const [currentProject, setCurrentProject] = useState({})

    const handleOnLoadProject = (project) => {
        setCurrentProject(project)
    }

    if (isAuth) {
        return (
            <div className={"wrapper"}>
                <header className={"header"}>
                    <div className={"header__container __container"}>
                        <div className={"header__body"}>
                            <div className={"header__navigation"}>
                                <button className={"header__menu"} onClick={handleOnToggleMenu}>
                                    <RiMenuFill size={35}/>
                                </button>
                            </div>
                            <div className={"header__main"}>
                                <button className={"header__logout"} onClick={handleOnLogout}>
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className={"page"}>
                    <div className={"page__container __container"}>
                        <div className={"page__body"}>
                            <div className={isMenuActive ? "page__navigation-active" : "page__navigation"}>
                                <Navigation/>
                            </div>
                            <div className={"page__main"}>
                                {
                                    currentProject.title ? (<Main/>) : (<Instruction/>)
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    } else {
        return (
            <div className={"wrapper"}>
                <div>
                    <button onClick={handleOnLogin}>Login</button>
                    Auth
                </div>
            </div>
        );
    }
};

export default Layout;