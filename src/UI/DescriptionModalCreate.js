import React, {useEffect, useState} from 'react';
import axios from "axios";

const DescriptionModalCreate = ({isActive, onSetActive, isAuth, onFetchDescriptions, project}) => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const [titleError, setTitleError] = useState("Название описаний не может быть пустым")
    const [textError, setTextError] = useState("Текст описаний не может быть пустым")
    const [titleDirty, setTitleDirty] = useState(false)
    const [textDirty, setTextDirty] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        if (titleError || textError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }

    }, [titleError, textError])

    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value)
        if (e.target.value.length < 5) {
            setTitleError("Название описаний слишком короткий")
            if (!e.target.value) {
                setTitleError("Название описаний не может быть пустым")
            }
        } else {
            setTitleError("")
        }
    }

    const handleOnChangeText = (e) => {
        setText(e.target.value)
        if (e.target.value.length < 5) {
            setTextError("Текст описаний слишком короткий")
            if (!e.target.value) {
                setTextError("Текст описаний не может быть пустым")
            }
        } else {
            setTextError("")
        }
    }

    const handleOnBlur = (e) => {
        switch (e.target.name) {
            case "title":
                setTitleDirty(true)
                break
            case "text":
                setTextDirty(true)
                break
        }
    }

    const handleOnCreateDescription = (e) => {
        e.preventDefault()
        if (isAuth) {
            const token = localStorage.getItem("JWT")
            axios.post("http://localhost:4444/descriptions", {
                title: title,
                text: text,
                project: project,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.description) {
                    onFetchDescriptions()
                    onSetActive(false)
                }
            })
        }
    }

    return (
        <div className={isActive ? "modal active" : "modal"} onClick={() => onSetActive(false)}>
            <div className={"modal__body"} onClick={e => e.stopPropagation()}>
                <form className={"modal__form"} onSubmit={(e) => handleOnCreateDescription(e)}>
                    <label className={"form__label"}>
                        Название описаний
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
                    <label className={"form__label"}>
                        Текст описаний
                    </label>
                    <div className={"form__error"}>
                        {
                            (textDirty && textError) && <>{textError}</>
                        }
                    </div>
                    <textarea name={"text"} className={"form__textarea"}
                              onBlur={(e) => handleOnBlur(e)}
                              value={text} onChange={(e) => handleOnChangeText(e)}
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

export default DescriptionModalCreate;