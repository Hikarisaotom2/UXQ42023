import React from 'react';
import Texto from './texto';
import { useState } from "react";

const Lista = () =>{
    const [texto, setTexto] = useState("Hola");
    return(
    <div>
        <h1>Ingrese el texto</h1>
        <input type="text" value={texto}  onChange={(event)=>{
            setTexto(event.target.value)
            }}/>
            <p>{texto}</p>
        <button>click me</button>
        <Texto/>
    </div>
    )
};

export default Lista;