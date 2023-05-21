import React from 'react';
import axios from "axios";

const DescriptionModalDelete = ({isActive, onSetActive, isAuth, onFetchDescriptions, description}) => {

    const handleOnDeleteDescription = (e) => {
        e.preventDefault()
        if (isAuth) {
            const token = localStorage.getItem("JWT")
            axios.delete(`http://localhost:4444/descriptions/${description._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.message) {
                    onSetActive(false)
                    onFetchDescriptions()
                }
            })
        }
    }

    return (
        <div className={isActive ? "modal active" : "modal"} onClick={() => onSetActive(false)}>
            <div className={"modal__body"} onClick={e => e.stopPropagation()}>
                <form className={"modal__form"} onSubmit={(e) => handleOnDeleteDescription(e)}>
                    <label className={"form__label"}>
                        Вы уверены что хотите удалить?
                    </label>
                    <div className={"modal__title"}>
                        {
                            description.title
                        }
                    </div>
                    <button type={"submit"} className={"modal__submit"}>
                        Да, удалить описание
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DescriptionModalDelete;