import React, { useState } from 'react';
import styles from '../css/sidebar.module.css';

export const Sidebar = ({setColor, setMode, changeSize, panelRef } : {setColor:Function, setMode:Function, changeSize:Function, panelRef:any }) => {
    const [size, setSize] = useState<any>('');
    return(
        <div className={styles.sidebar}>
            <label onClick={() => setMode('draw')}>Select Color</label>
            <input type='color' style={{cursor: 'pointer'}} onChange={(e) => {
                setColor(e.target.value);
                setMode('draw')
            }}/>
            
            <div style={{display: 'flex', alignItems: 'center', cursor:'pointer'}} onClick={() => setMode('erase')}>
            <label>Eraser</label>
            <div className={styles.eraser}></div>
            </div>

            
            <form onSubmit={(event:React.FormEvent) => {
                event.preventDefault()
                changeSize(size)
                setSize('')

            }}>
                <label>Set Size</label>
                <input type='number' onChange={(e) => setSize(e.target.value)} value={size}/>
                {(size !== '') ? (
                    <button type='submit'>Submit</button>
                ) : null}
            </form>

            <button style={{marginTop: '30px', cursor: 'pointer'}} onClick={() => setMode('save')}>Save</button>
        </div>
    )
}