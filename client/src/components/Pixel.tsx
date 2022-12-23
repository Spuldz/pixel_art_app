import { FormEvent, useEffect, useState } from 'react';
import styles from '../css/draw.module.css';
import { Save } from '../interfaces/save';

export const Pixel = ({ selectedColor, mode,  colorArray, saveColor} : {selectedColor:string, mode:string,  colorArray:string[], saveColor:string}) => {
    const [color, setColor] = useState(selectedColor)
    const [permanentColor, setPermanentColor] = useState<string>('');
    const [canChange, setCanChange] = useState<boolean>(true);

    const defaultColor = '#fff'

   

    if(mode === 'save'){

        colorArray.push(permanentColor === '' ? '#fff' : permanentColor)   
 
    }

    const applyColor = () => {
      if(mode === 'draw'){
        setPermanentColor(selectedColor)
        setCanChange(false)
      }

      if(mode === 'erase' && !canChange){
        setPermanentColor(defaultColor)
        setCanChange(true)
      }
    }

    const handleMouseEnter = () => {
        if(mode === 'draw'){
            setColor(selectedColor)
        }else if(mode === 'erase'){
            setColor('#f5f5f5')
        }
    }

    const handleMouseLeave = () => {
        if(mode === 'draw'){
            setColor(defaultColor)
        }
        if(mode === 'erase'){
            setColor(defaultColor)
        }
    }
   

    

    return(
        <div style={{backgroundColor: canChange ? saveColor !== null ? saveColor : color :  permanentColor, cursor: 'pointer' }} onClick={applyColor} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div>
    )
}