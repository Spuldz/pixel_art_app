import React, { useEffect, useRef, useState } from 'react';
import { Pixel } from '../components/Pixel';
import styles from '../css/draw.module.css';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import axios from 'axios';
import { exportComponentAsPNG } from 'react-component-export-image';
import { Save } from '../interfaces/save';


export const Draw = ({account, save} : {account:any, save:Save | null}) => {
    const [color, setColor] = useState('#fff')
    const [mode, setMode] = useState('draw')
    const [pixels, setPixels] = useState<any[]>([])
    const [size, setSize] = useState<number>(30);
    const panelRef = useRef<any>();



    const pxls:any = [];
    const r = document.querySelector(':root') as HTMLElement;
    const colorArray:string[] = []

    
  

    useEffect(() => {
        r.style.setProperty('--size', size.toString())

        for(let i = 0; i< size * size; i++){
            pxls.push(<Pixel selectedColor={color} mode={mode}  colorArray={colorArray} saveColor={'black'}/>)
        }

        setPixels(pxls)
        setMode('draw')
        
       
       
    }, [])



    useEffect(() => {
        r.style.setProperty('--size', size.toString())

        for(let i = 0; i< size * size; i++){
            pxls.push(<Pixel selectedColor={color} mode={mode}   colorArray={colorArray} saveColor='black'/>)
        }

        setPixels(pxls)

        if(mode === 'save'){
            setTimeout(() => saveProject(), 1)
            //exportComponentAsPNG(panelRef, {fileName: "project"})

        }

      
        if(save !== null){
            setSize(Math.sqrt(save?.colorArray.length))
        }
       
    }, [color, mode, size, save])

    // useEffect(() => {
    //     if(save !== null){
    //         setSize(Math.sqrt(save?.colorArray.length))
    //     }
    // }, [save])



    const changeSize = async (num) => {
       await setSize(num)
       setColor('#fff')
    }

    const saveProject = () => {



        axios.post('http://localhost:5000/saveProject', {
            colorArray: colorArray,
            id: account
        }).then(
            res => {
                console.log(res.data)
                colorArray.splice(0, colorArray.length)
            }
        )
    }
  
    return(
        <>
        <Header/>
        <Sidebar setColor={setColor} setMode={setMode}  changeSize={changeSize} panelRef={panelRef}/>
        <div className={styles.main}>
        <div className={styles.container} ref={panelRef}>
            {(pixels.map((item) => (
                item
            )))}
           
        </div>
        </div>

        </>
    )
}