import React, {useEffect, useState} from 'react';
import DescriptionModalCreate from "../UI/DescriptionModalCreate";
import axios from "axios";
import DescriptionModalEdit from "../UI/DescriptionModalEdit";
import DescriptionModalDelete from "../UI/DescriptionModalDelete";
import {RiCloseLine, RiEditLine} from "react-icons/ri";

const Review = ({currentProject}) => {
    const isAuth = true
    const [descriptions, setDescriptions] = useState([])

    useEffect(() => {
        if (isAuth) {
            handleOnFetchDescriptions()
        } else {
            setDescriptions([])
        }
    }, [])

    const handleOnFetchDescriptions = () => {
        setTimeout(() => {
            const token = localStorage.getItem("JWT")
            const id = currentProject._id
            axios.get(`http://localhost:4444/descriptions/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setDescriptions(response.data.description)
            })
        }, 500)
    }

    const [description, setDescription] = useState({})
    const [isModalCreateActive, setIsModalCreateActive] = useState(false)
    const [isModalEditActive, setIsModalEditActive] = useState(false)
    const [isModalDeleteActive, setIsModalDeleteActive] = useState(false)

    const handleOnCreateDescription = () => {
        setIsModalCreateActive(true)
    }

    const handleOnEditDescription = (description) => {
        setDescription(description)
        setIsModalEditActive(true)
    }

    const handleOnDeleteDescription = (description) => {
        setDescription(description)
        setIsModalDeleteActive(true)
    }

    return (
        <div className={"review"}>
            <div className={"review__body"}>
                <>
                    {
                        isModalCreateActive && <DescriptionModalCreate isActive={isModalCreateActive}
                                                                       onSetActive={setIsModalCreateActive}
                                                                       isAuth={isAuth}
                                                                       project={currentProject}
                                                                       onFetchDescriptions={handleOnFetchDescriptions}
                        />
                    }
                </>
                <>
                    {
                        isModalEditActive && <DescriptionModalEdit isActive={isModalEditActive}
                                                                     onSetActive={setIsModalEditActive}
                                                                     isAuth={isAuth}
                                                                     description={description}
                                                                     onFetchDescriptions={handleOnFetchDescriptions}
                        />
                    }
                </>
                <>
                    {
                        isModalDeleteActive && <DescriptionModalDelete isActive={isModalDeleteActive}
                                                                       onSetActive={setIsModalDeleteActive}
                                                                       isAuth={isAuth}
                                                                       description={description}
                                                                       onFetchDescriptions={handleOnFetchDescriptions}
                        />
                    }
                </>
                <button className={"review__button"} onClick={handleOnCreateDescription}>
                    + Создать описание
                </button>
                <div className={"review__descriptions"}>
                    {
                        descriptions.map((description, index) => (
                            <div className={"review__description"} key={index}>
                                <div className={"description__head"}>
                                    <div className={"description__title"}>
                                        {
                                            description.title
                                        }
                                    </div>
                                    <div className={"description__buttons"}>
                                        <button className={"description__button"}
                                                onClick={() => handleOnEditDescription(description)}
                                        >
                                            <RiEditLine size={35}/>
                                        </button>
                                        <button className={"description__button"}
                                                onClick={() => handleOnDeleteDescription(description)}
                                        >
                                            <RiCloseLine size={35}/>
                                        </button>
                                    </div>
                                </div>

                                <div className={"description__text"}>
                                    {
                                        description.text
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Review;