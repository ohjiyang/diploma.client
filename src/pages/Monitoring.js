import React, {useEffect, useState} from 'react';
import axios from "axios";
import MonitoringCounter from "../components/MonitoringCounter";
import MonitoringChart from "../components/MonitoringChart";
import MonitoringChart2 from "../components/MonitoringChart2";

const Monitoring = ({currentProject}) => {
    const [statuses, setStatuses] = useState([])
    const [data, setData] = useState([])

    const [labels, setLabels] = useState({})


    useEffect(() => {
        if (currentProject.title) {
            handleOnFetchStatuses()
            handleOnFetchData()
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

    const handleOnFetchData = () => {
        setTimeout(() => {
            const token = localStorage.getItem("JWT")
            axios.get(`http://localhost:4444/monitoring/${currentProject._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.counts) {
                    setLabels(response.data.counts.map(count => count.status))
                    setData(response.data.counts.map(count => count.count))
                }
            })
        }, 100)
    }

    return (
        <div className={"monitoring"}>
            <div className={"monitoring__statuses"}>
                {
                    statuses.map((status, statusIndex) => (
                        <div key={statusIndex}>
                            <MonitoringCounter status={status} currentProject={currentProject}/>
                        </div>
                    ))
                }
            </div>
            <div className={"monitoring__diagrams"}>
                {
                    data[0] ? (
                        <>
                            <div className={"monitoring__diagram"}>
                                <MonitoringChart labels={labels} data={data}/>
                            </div>
                            <div className={"monitoring__diagram"}>
                                <MonitoringChart2 labels={labels} data={data}/>
                            </div>
                        </>
                    ) : (
                        <></>
                    )
                }

            </div>
        </div>
    );
};

export default Monitoring;