import React from 'react';
import axios from "axios";

const ProjectModalDelete = ({isActive, onSetActive, project, onFetchProjects, isAuth}) => {

    const handleOnDeleteProject = (e) => {
        e.preventDefault()
        if (isAuth) {
            const token = localStorage.getItem("JWT")
            axios.delete(`http://localhost:4444/projects/${project._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.message) {
                    onSetActive(false)
                    onFetchProjects()
                }
            })
        }
    }

    return (
        <div className={isActive ? "modal active" : "modal"} onClick={() => onSetActive(false)}>
            <div className={"modal__body"} onClick={e => e.stopPropagation()}>
                <form className={"modal__form"} onSubmit={(e) => handleOnDeleteProject(e)}>
                    <label className={"form__label"}>
                        Вы уверены что хотите удалить?
                    </label>
                    <div className={"modal__title"}>
                        {
                            project.title
                        }
                    </div>
                    <button type={"submit"} className={"modal__submit"} onClick={handleOnDeleteProject}>
                        Да, удалить проект
                    </button>
                </form>
            </div>
        </div>
);
};

export default ProjectModalDelete;