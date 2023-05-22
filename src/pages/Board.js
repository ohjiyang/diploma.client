import React, {useEffect, useState} from 'react';
import {RiCloseLine, RiEditLine} from "react-icons/ri";
import axios from "axios";
import TaskModalCreateBoard from "../UI/TaskModalCreateBoard";
import StatusModalCreate from "../UI/StatusModalCreate";
import TaskInfo from "../components/TaskInfo";
import StatusModalEdit from "../UI/StatusModalEdit";
import TaskModalEditBoard from "../UI/TaskModalEditBoard";

const Board = ({currentProject, isMenuActive}) => {
    const [isTaskInfoActive, setTaskInfoActive] = useState(false)
    const [currentTask, setCurrentTask] = useState({})

    const handleOnToggleTaskInfo = (task) => {
        setCurrentTask(task)
        setTaskInfoActive(prevState => !prevState)
    }
    const [currentStatus, setCurrentStatus] = useState({})
    const [statuses, setStatuses] = useState([])
    const [tasks, setTasks] = useState([])
    const [isModalCreateActive, setModalCreateActive] = useState(false)
    const [isModalStatusCreateActive, setModalStatusCreateActive] = useState(false)
    const [isModalEditActive, setModalEditActive] = useState(false)
    const [isModalStatusEditActive, setModalStatusEditActive] = useState(false)
    const [statusId, setStatusId] = useState("")

    useEffect(() => {
        if (currentProject.title) {
            handleOnFetchTasks()
            handleOnFetchStatuses()
        }
    }, [currentProject])

    const handleOnFetchStatuses = () => {
        setTimeout(() => {
            const token = localStorage.getItem("JWT")
            axios.get(`http://localhost:4444/status/all/${currentProject._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.status) {
                    setStatuses(response.data.status)
                }
            })
        }, 100)
    }

    const handleOnFetchTasks = () => {
        setTimeout(() => {
            const token = localStorage.getItem("JWT")
            axios.get(`http://localhost:4444/tasks/all/${currentProject._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setTasks(response.data.tasks)
            })
        }, 100)
    }

    const handleOnCreateStatus = () => {
        setModalStatusCreateActive(true)
    }

    const handleOnCreateTask = (status) => {
        setStatusId(status)
        setModalCreateActive(true)
    }


    const handleOnDeleteStatus = (status) => {
        const token = localStorage.getItem("JWT")
        tasks.forEach(task => {
            if (task.status !== null && task.status._id === status._id) {
                axios.delete(`http://localhost:4444/tasks/${task._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }
        })

        setTaskInfoActive(false)
        setCurrentTask({})
        axios.delete(`http://localhost:4444/status/${status._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.message) {
                handleOnFetchStatuses()
                handleOnFetchTasks()
            }
        })
    }

    const [draggableTask, setDraggableTask] = useState({})

    const handleOnDragStart = (task) => {
        setDraggableTask(task)
    }

    const handleOnDragOver = (e) => {
        e.preventDefault()
        if (e.target.className === "board__board") {
            e.target.style.border = "1px dashed #000000"
        }
    }

    const handleOnDragLeave = (e) => {
        if (e.target.className === "board__board") {
            e.target.style.border = "1px solid #F9F8F8"
        }
    }
    const handleOnDragEnd = () => {
        setDraggableTask({})
    }
    const handleOnDrop = (e, status) => {
        e.preventDefault()
        if (e.target.className === "board__board") {
            e.target.style.border = "1px solid #F9F8F8"
        }

        const token = localStorage.getItem("JWT")
        axios.patch(`http://localhost:4444/tasks/${draggableTask._id}`, {
            status: status._id,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.task) {
                handleOnFetchStatuses()
                handleOnFetchTasks()
            }
        })


    }

    const handleOnEditStatus = (status) => {
        setCurrentStatus(status)
        setModalStatusEditActive(true)
    }

    const handleOnEditTask = () => {
        setModalEditActive(true)
    }
    return (
        <div className={"board"}>
            <div className={`board__body ${
                isMenuActive && isTaskInfoActive ? 'board__body-left1' :
                    isMenuActive && !isTaskInfoActive ? 'board__body-left2' :
                        !isMenuActive && isTaskInfoActive ? 'board__body-left3' :
                            'board__body-left4'
            }`}>
                <>
                    {
                        isModalStatusCreateActive && <StatusModalCreate isActive={isModalStatusCreateActive}
                                                                        onSetActive={setModalStatusCreateActive}
                                                                        onFetchStatuses={handleOnFetchStatuses}
                                                                        currentProject={currentProject}

                        />
                    }
                </>
                <>
                    {
                        isModalStatusEditActive && <StatusModalEdit isActive={isModalStatusEditActive}
                                                                    onSetActive={setModalStatusEditActive}
                                                                    onFetchStatuses={handleOnFetchStatuses}
                                                                    status={currentStatus}

                        />
                    }
                </>
                <>
                    {
                        isModalCreateActive && <TaskModalCreateBoard isActive={isModalCreateActive}
                                                                     onSetActive={setModalCreateActive}
                                                                     onFetchTasks={handleOnFetchTasks}
                                                                     currentProject={currentProject}
                                                                     statusId={statusId}

                        />
                    }
                </>
                <>
                    {
                        isModalEditActive && <TaskModalEditBoard isActive={isModalEditActive}
                                                                 onSetActive={setModalEditActive}
                                                                 onFetchTasks={handleOnFetchTasks}
                                                                 task={currentTask}
                                                                 onSetTaskInfo={setTaskInfoActive}

                        />
                    }
                </>
                <button className={"board__button"} onClick={handleOnCreateStatus}>
                    + Создать доску
                </button>
                <div className={"board__boards"}>
                    {
                        statuses.map((status, statusIndex) => (
                            <div className={"board__board"} key={statusIndex}
                                 onDragOver={(e) => handleOnDragOver(e)}
                                 onDragLeave={(e) => handleOnDragLeave(e)}

                                 onDrop={(e) => handleOnDrop(e, status)}>
                                <div className={"board__board-head"}>
                                    <div className={"board__board-title"}>
                                        {
                                            status.title
                                        }
                                    </div>
                                    <div className={"board__board-buttons"}>
                                        <button className={"board__board-button"}
                                                onClick={() => handleOnEditStatus(status)}
                                        >
                                            <RiEditLine size={35}/>
                                        </button>
                                        <button className={"board__board-button"}
                                                onClick={() => handleOnDeleteStatus(status)}>
                                            <RiCloseLine size={35}/>
                                        </button>
                                    </div>
                                </div>
                                <div className={"board__board-body"}>
                                    <div className={"board__tasks"}>
                                        {
                                            tasks.map((task, taskIndex) => (
                                                <div key={taskIndex} className={"asd"}>
                                                    {
                                                        task.status?._id === status._id ? (
                                                            <button className={"board__task"}
                                                                    draggable={true}
                                                                    onClick={() => handleOnToggleTaskInfo(task)}
                                                                    onDragStart={() => handleOnDragStart(task)}
                                                                    onDragEnd={() => handleOnDragEnd()}
                                                            >
                                                                <div className={"board__task-title"}>
                                                                    {
                                                                        task.title
                                                                    }
                                                                </div>
                                                            </button>) : (
                                                            <></>
                                                        )
                                                    }
                                                </div>

                                            ))
                                        }
                                        <button className={"task__button"}
                                                onClick={() => handleOnCreateTask(status._id)}
                                        >
                                            + Создать задачу
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={isTaskInfoActive ? "board__body-right__active" : "board__body-right"}>
                <TaskInfo task={currentTask} onSetTaskInfo={setTaskInfoActive} OnFetchTasks={handleOnFetchTasks} OnEditTask={handleOnEditTask}/>
            </div>
        </div>
    );
};

export default Board;