import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import styles from '../css/profile.module.css'


export const Profile = ({ setAccount, userData, setSave} : { setAccount:Function, userData:any, setSave:Function}) => {
    const navigate = useNavigate()




    const logout = () => {
        axios.get('http://localhost:5000/logout').then(
            res => {
                setAccount(res.data.account)
                navigate('/login')
            }
        )
    }

    useEffect(() => {
       // setSave(null)
    }, [])



    return(
        <div>
            <Header/>
            
            {(typeof userData === 'undefined') ? (
                <p>loading...</p>
            ) : (
                <>
                    <p>username {userData.username}</p>

                    <div className={styles.projectWrapper}>
                       {(typeof userData.projects !== 'undefined') ? (
                            userData.projects.map((item, index) => (
                                <div className={styles.project} onClick={() => {
                                    setSave(item)
                                    navigate('/draw')
                                }}></div>
                            ))
                       ) : (
                        <p>No projects found!</p>
                       )}
                    </div>
                </>
            )}
            <button onClick={logout}>Logout</button>
            
            
            
        </div>
    )
}