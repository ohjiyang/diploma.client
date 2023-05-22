import React, {useEffect, useState} from 'react';
import axios from "axios";

const MonitoringCounter = ({status, currentProject}) => {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        handleOnFetchCounter()
    }, [status])

    const handleOnFetchCounter = () => {
        setTimeout(() => {
            const token = localStorage.getItem("JWT")
            axios.post("http://localhost:4444/monitoring/status/", {
                status: status._id,
                project: currentProject._id
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.tasks) {
                    setCounter(response.data.tasks)
                }
            })
        }, 100)
    }

    return (
        <div className={"monitoring__status"}>
            {
                status.title
            }
            <div className={"status__counter"}>
                {
                    counter
                }
            </div>
        </div>
    );
};

export default MonitoringCounter;