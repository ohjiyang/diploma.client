import React, {useEffect, useState} from 'react';
import axios from "axios";

const ProjectModalEdit = ({isActive, onSetActive, isAuth, onFetchProjects, project, currentProject, onLoadProject}) => {
    const [title, setTitle] = useState(project.title)

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

    const handleOnEditProject = (e) => {
        e.preventDefault()
        if (isAuth) {
            const token = localStorage.getItem("JWT")
            axios.patch(`http://localhost:4444/projects/${project._id}`, {
                title: title,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.project) {
                    if (currentProject._id && response.data.project._id === currentProject._id) {
                        onLoadProject(response.data.project)
                    }
                    onSetActive(false)
                    onFetchProjects()
                }
            })
        }
    }

    return (
        <div className={isActive ? "modal active" : "modal"} onClick={() => onSetActive(false)}>
            <div className={"modal__body"} onClick={e => e.stopPropagation()}>
                <form className={"modal__form"} onSubmit={(e) => handleOnEditProject(e)}>
                    <label className={"form__label"}>
                        Новое название проекта
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
                            isFormValid ? ("Изменить название") : ("Заполните поля")
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectModalEdit;