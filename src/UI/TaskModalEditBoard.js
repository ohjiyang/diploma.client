import React, {useEffect, useState} from 'react';
import axios from "axios";

const TaskModalEditBoard = ({isActive, onSetActive, onFetchTasks, task, onSetTaskInfo}) => {
    const [title, setTitle] = useState("")

    const [titleError, setTitleError] = useState("Название задачи не может быть пустым")
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
            setTitleError("Название задачи слишком короткий")
            if (!e.target.value) {
                setTitleError("Название задачи не может быть пустым")
            }
        } else {
            setTitleError("")
        }
    }

    const handleOnBlur = () => {
        setTitleDirty(true)
    }

    const handleOnCreateTask = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("JWT")
        axios.patch(`http://localhost:4444/tasks/title/${task._id}`, {
            title: title,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.task) {
                onFetchTasks()
                onSetActive(false)
                onSetTaskInfo(false)
            }
        })

    }

    return (
        <div className={isActive ? "modal active" : "modal"} onClick={() => onSetActive(false)}>
            <div className={"modal__body"} onClick={e => e.stopPropagation()}>
                <form className={"modal__form"} onSubmit={(e) => handleOnCreateTask(e)}>
                    <label className={"form__label"}>
                        Название задачи
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
                            isFormValid ? ("Изменить задачу") : ("Заполните поля")
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskModalEditBoard;