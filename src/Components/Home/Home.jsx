import React, { useState } from 'react'
import styles from "./Home.module.css"
import {useLocation, useNavigate} from "react-router-dom"
import Dashboard from '../Dashboard/Dashboard'
import Analytics from '../Analytics/Analytics'
import Createquiz from '../Createquiz/Createquiz'
import Questionanalysis from '../Questionanalysis/Questionanalysis'
import { useDispatch } from 'react-redux'
import { resetuser } from '../../redux/Userslice'
const Home = () => {
    const location = useLocation().pathname.split("/")
    const history = useNavigate()
    const dispatch = useDispatch()
    const url = location[location.length - 1]
    function deleteuser(){
        dispatch(resetuser())
        history("/")
    }
    return (
        <div className={styles.maincontainer}>
            <div className={styles.leftcontainer}>
                <h1>QUIZZIE</h1>
                <div>
                    <h3 className={url == "dashboard" && styles.selectedroute}
                    onClick={()=>{
                        history("/dashboard")
                    }}
                    >Dashboard</h3>
                    <h3 className={url == "analytics" && styles.selectedroute}
                    onClick={()=>{
                        history("/analytics")
                    }}                    
                    >Analytics</h3>
                    <h3 className={url == "createquiz" && styles.selectedroute}
                    onClick={()=>{
                        history("/createquiz")
                    }}                    
                    >Create Quiz</h3>
                </div>
                <h2 onClick={deleteuser}>LOGOUT</h2>
            </div>
            <div className={styles.rightcontainer}>
                {
                    url == "dashboard" && <Dashboard/>
                }
                {
                    url == "analytics" && <Analytics/>
                }
                {
                    url == "createquiz" && <Createquiz/>
                }
                {
                    url != "dashboard" && url != "analytics" && url != "createquiz" &&
                    <Questionanalysis/>
                }
            </div>
        </div>
    )
}

export default Home