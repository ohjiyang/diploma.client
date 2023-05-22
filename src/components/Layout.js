import React, {useState, useEffect} from 'react';
import {RiMenuFill} from "react-icons/ri";
import Navigation from "./Navigation";
import Instruction from "./Instruction";
import Main from "./Main";
import Auth from "./Auth";

const Layout = ({currentProject, onLoadProject, isMenuActive, onToggleMenu}) => {
    //Авторизация
    const [isAuth, setIsAuth] = useState(false)

    const handleOnLogin = () => {
        setIsAuth(true)
    }

    const handleOnLogout = () => {
        setIsAuth(false)
        localStorage.clear()
    }

    useEffect(() => {
        const jwt = localStorage.getItem("JWT")
        if (jwt !== null) {
            setIsAuth(true)
        }
    }, [])

    //Отображение меню навигации
    const handleOnToggleMenu = () => {
        onToggleMenu()
    }

    const handleOnLoadProject = (project) => {
        onLoadProject(project)
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
                                <Navigation isAuth={isAuth}
                                            isMenuActive={isMenuActive}
                                            currentProject={currentProject}
                                            onLoadProject={handleOnLoadProject}
                                />
                            </div>
                            <div className={"page__main"}>
                                {
                                    currentProject.title ? (
                                        <Main
                                            currentProject={currentProject}
                                            onLoadProject={handleOnLoadProject}
                                        />
                                    ) : (
                                        <Instruction/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    } else {
        return (
            <Auth onLogin={handleOnLogin}/>
        );
    }
};

export default Layout;