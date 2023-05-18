import React, {useState} from 'react';
import AuthRegistration from "./AuthRegistration";
import AuthLogin from "./AuthLogin";

const Auth = ({onLogin}) => {
    const [isHaveAnAccount, setIsHaveAnAccount] = useState(false)

    const handleToggleAccount = () => {
        setIsHaveAnAccount(prevState => !prevState)
    }

    const handleOnLogin = () => {
        onLogin()
    }

    return (
        <div className={"wrapper"}>
            <div className={"auth"}>
                <div className={"auth__container __container"}>
                    <div className={"auth__body"}>
                        <div className={isHaveAnAccount ? "auth__left left__login" : "auth__left left__registration"}>
                            <div className={"left__head"}>
                                <div
                                    className={isHaveAnAccount ? "left__logo left__logo-login" : "left__logo left__logo-registration"}>
                                    Somenotes App
                                </div>
                                <div
                                    className={isHaveAnAccount ? "left__title left__title-login" : "left__title left__title-registration"}>
                                    Управляй проектами проще, быстрее, эффективнее
                                </div>
                            </div>
                            <div className={"left__body"}>

                            </div>
                        </div>
                        <div className={"auth__right"}>
                            {
                                isHaveAnAccount ? (
                                    <AuthRegistration onToggleAccount={handleToggleAccount} onLogin={handleOnLogin}/>
                                ) : (
                                    <AuthLogin onToggleAccount={handleToggleAccount} onLogin={handleOnLogin}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;