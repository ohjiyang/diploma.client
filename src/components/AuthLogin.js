import React, {useState, useEffect} from 'react';
import axios from "axios";

const AuthLogin = ({onLogin, onToggleAccount}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //Ошибки для вывода пользователю
    const [responseError, setResponseError] = useState("")
    const [usernameError, setUsernameError] = useState("Имя пользователя не может быть пустым")
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым")
    //Разрешение на проверку ошибок для поле ввода
    const [responseDirty, setResponseDirty] = useState(false)
    const [usernameDirty, setUsernameDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    //Разрешение на отправку данных
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        if (usernameError || passwordError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }

    }, [usernameError, passwordError])

    const handleToggleAccount = () => {
        onToggleAccount()
        setUsername("")
        setPassword("")
        setUsernameDirty(false)
        setPasswordDirty(false)
        setResponseDirty(false)
        setPasswordError("")
        setUsernameError("Имя пользователя не может быть пустым")
        setPasswordError("Пароль не может быть пустым")
    }

    const handleOnChangeUsername = (e) => {
        setUsername(e.target.value)
        if (e.target.value.length < 6) {
            setUsernameError("Имя пользователя слишком короткий")
            if (!e.target.value) {
                setUsernameError("Имя пользователя не может быть пустым")
            }
        } else {
            setUsernameError("")
        }
    }

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8) {
            setPasswordError("Пароль слишком короткий")
            if (!e.target.value) {
                setPasswordError("Пароль не может быть пустым")
            }
        } else {
            setPasswordError("")
        }
    }

    const handleOnBlur = (e) => {
        switch (e.target.name) {
            case "username":
                setUsernameDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }

    const handleAuth = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4444/auth/login", {
            username: username,
            password: password
        }).then((response) => {
            localStorage.setItem("JWT", response.data.token)
            onLogin()
            handleToggleAccount()
        }).catch((error) => {
            setResponseDirty(true)
            setResponseError(error.response.data.message)
        })
    }

    return (
        <div className={"right__body"}>
            <div className={"right__title"}>
                Вход
            </div>
            <form className={"right__form"} onSubmit={(e) => handleAuth(e)}>
                <label className={"form__label"}>
                    Имя пользователя
                </label>
                <div className={"form__error"}>
                    {
                        (usernameDirty && usernameError) && <>{usernameError}</>
                    }
                </div>
                <input name={"username"} type={"text"} className={"form__input"}
                       onBlur={(e) => handleOnBlur(e)}
                       value={username} onChange={(e) => handleOnChangeUsername(e)}
                />
                <label className={"form__label"}>
                    Пароль
                </label>
                <div className={"form__error"}>
                    {
                        (passwordDirty && passwordError) && <>{passwordError}</>
                    }
                </div>
                <input name={"password"} type={"password"} className={"form__input"}
                       onBlur={(e) => handleOnBlur(e)}
                       value={password} onChange={(e) => handleOnChangePassword(e)}
                />
                <div className={"form__error"}>
                    {
                        (responseDirty && responseError) && <>{responseError}</>
                    }
                </div>
                <button type={"submit"} className={"form__submit"} disabled={!isFormValid}>
                    {
                        isFormValid ? ("Войти") : ("Заполните поля")
                    }
                </button>
            </form>
            <div className={"right__option"}>
                У вас еще нет учетной записи?
                <button className={"option__button"} onClick={handleToggleAccount}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};

export default AuthLogin;