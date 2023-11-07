import React, { useState } from 'react';
import Texto from './texto';

const Lista = () =>{
    const [texto, setTexto] = useState("Hola");
    const [arreglo, setArreglo] = useState(["Manzana","Uva"]);
    const multiple= ()=>{

      if(texto){
            if(texto==="adios"){
                return <p>Que le vaya bien</p>
            }else{
                return <Texto/>
            }
        }else{
            return <p>No hay nada que mostrar</p>
        }
    }
    return(
    <div>
        <h1>Ingrese el texto</h1>
        <input type="text" value={texto}  onChange={(event)=>{
            setTexto(event.target.value)
            }}/>
            
            <p>{texto}</p>
        <button >click me</button>
            {/* {
               texto&&<Texto/>
            } */}

            { texto ? <Texto/>  :<p>No hay nada que mostrar</p> }
            {
                multiple()
            }
            {
                 arreglo.map(item =>{
                    return <p>{item}</p>
                })
                
            }
        
    </div>
    )
};

export default Lista;