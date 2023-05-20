import React, {useEffect, useState} from 'react';
import axios from "axios";

const ProjectModalCreate = ({isActive, onSetActive, isAuth, onFetchProjects}) => {
    const [title, setTitle] = useState("")

    const [titleError, setTitleError] = useState("Название проекта не может быть пустым")
    const [titleDirty, setTitleDirty] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        if (titleError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }

    }, [titleError])

    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value)
        if (e.target.value.length < 5) {
            setTitleError("Название проекта слишком короткий")
            if (!e.target.value) {
                setTitleError("Название проекта не может быть пустым")
            }
        } else {
            setTitleError("")
        }
    }

    const handleOnBlur = () => {
        setTitleDirty(true)
    }

    const handleOnCreateProject = (e) => {
        e.preventDefault()
        if (isAuth) {
            const token = localStorage.getItem("JWT")
            axios.post("http://localhost:4444/projects", {
                title: title,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.project) {
                    onFetchProjects()
                    onSetActive(false)
                }
            })
        }
    }

    return (
        <div className={isActive ? "modal active" : "modal"} onClick={() => onSetActive(false)}>
            <div className={"modal__body"} onClick={e => e.stopPropagation()}>
                <form className={"modal__form"} onSubmit={(e) => handleOnCreateProject(e)}>
                    <label className={"form__label"}>
                        Название проекта
                    </label>
                    <div className={"form__error"}>
                        {
                            (titleDirty && titleError) && <>{titleError}</>
                        }
                    </div>
                    <input name={"title"} type={"text"} className={"form__input"}
                           onBlur={(e) => handleOnBlur(e)}
                           value={title} onChange={(e) => handleOnChangeTitle(e)}
                    />
                    <button type={"submit"} className={"modal__submit"} disabled={!isFormValid}>
                        {
                            isFormValid ? ("Создать проект") : ("Заполните поля")
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectModalCreate;