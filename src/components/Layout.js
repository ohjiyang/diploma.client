import React,{useState} from 'react';

const Layout = () => {
    const [isAuth, setIsAuth] = useState(false)

    const handleOnLogin = () => {
        setIsAuth(true)
    }

    const handleOnLogout = () => {
        setIsAuth(false)
    }

    if (isAuth) {
        return (
            <div className={"wrapper"}>
                <div>
                    <button onClick={handleOnLogout}>Logout</button>
                    Layout
                </div>
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