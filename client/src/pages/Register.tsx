import axios from 'axios';
import { useState } from 'react';
import styles from '../css/register.module.css';


export const Register = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const register = () => {
        axios.post('http://localhost:5000/register', {
            username: username,
            password: password
        })
    }

    return(
        <>
        <div className={styles.card}>
            <div className={styles.top}>Register</div>
            <div className={styles.content}>
                <div className={styles.inputHolder}>
                    <input placeholder='username' className={styles.inputs} onChange={(e) => setUsername(e.target.value)} value={username}/>
                    <br/>
                    <input placeholder='password' className={styles.inputs} onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <br/>
                    <button className={styles.inputs} onClick={register}>Register</button>
                </div>
            </div>
        </div>
        </>
    )
}