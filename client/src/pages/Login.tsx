import styles from '../css/login.module.css';
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Login = ({ setAccount, getUserData} : { setAccount:Function, getUserData:Function}) => {

    const [username, setUsername] = useState<any>('');
    const [password, setPassword] = useState<any>('');

    const navigate = useNavigate();




    const login = () => {
       axios.post('http://localhost:5000/users', {
        username: username,
        password: password
       }).then(
       async res => {
           await setAccount(res.data.loggedInAccount)
           await getUserData()
           navigate('/user')          
        }
       )
    }

    return(
        <>
        <div className={styles.card}>
            <div className={styles.top}>Login</div>
            <div className={styles.content}>
                <div className={styles.inputHolder}>
                    <input placeholder='username' className={styles.inputs} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <br/>
                    <input placeholder='password' className={styles.inputs} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <button className={styles.inputs} onClick={login}>Login</button>
                </div>
            </div>
        </div>
        </>
    )
}