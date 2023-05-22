import React, {useEffect, useState} from 'react';
import {RiCloseLine, RiEditLine, RiSendPlane2Line} from "react-icons/ri";
import axios from "axios";

const TaskInfo = ({task, OnFetchTasks, OnEditTask, onSetTaskInfo}) => {
    const isAuth = true
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (isAuth) {
            if (task.title) {
                handleOnFetchComments()
            }
        } else {
            setComments([])
        }
    }, [task])

    const handleOnFetchComments = () => {
        setTimeout(() => {
            const token = localStorage.getItem("JWT")
            axios.get(`http://localhost:4444/comments/all/${task._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.comments) {
                    setComments(response.data.comments)
                }
            })
        }, 500)
    }

    const handleOnChangeComment = (e) => {
        setComment(e.target.value)
    }

    const handleOnSendComment = () => {
        if (isAuth) {
            const token = localStorage.getItem("JWT")
            axios.post("http://localhost:4444/comments", {
                title: comment,
                task: task._id
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.comment) {
                    handleOnFetchComments()
                }
            })
            setComment("")
        }
    }

    const handleOnEditTask = () => {
        OnEditTask()
    }

    const handleOnDeleteTask = () => {
        const token = localStorage.getItem("JWT")
        axios.delete(`http://localhost:4444/tasks/${task._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.message) {
                OnFetchTasks()
                onSetTaskInfo(false)
            }
        })
    }

    if (task.title) {
        return (
            <div className={"task__info"}>
                <div className={"info__head"}>
                    <div className={"info__title"}>
                        {
                            task.title
                        }
                    </div>
                    <div className={"info__buttons"}>
                        <div className={"info__button"} onClick={handleOnEditTask}>
                            <RiEditLine size={35}/>
                        </div>
                        <div className={"info__button"} onClick={handleOnDeleteTask}>
                            <RiCloseLine size={35}/>
                        </div>
                    </div>
                </div>
                <div className={"info__body"}>
                    <div className={"info__comments"}>
                        {
                            comments.map((comment, index) => (
                                <div className={"info__comment"} key={index}>
                                    <div className={"comment__title"}>
                                        {
                                            comment.user.username
                                        }
                                    </div>
                                    <div className={"comment__text"}>
                                        {
                                            comment.title
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={"info__foot"}>
                    <input className={"info__input"} value={comment} onChange={(e)=>handleOnChangeComment(e)}/>
                    <button className={"info__button"} onClick={handleOnSendComment}>
                        <RiSendPlane2Line size={35}/>
                    </button>
                </div>
            </div>
        );
    }
};

export default TaskInfo;