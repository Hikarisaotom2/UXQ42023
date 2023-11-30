import React, { useState, useEffect} from 'react';
import Texto from './texto';
import axios from 'axios';

const Lista = () =>{
    const [texto, setTexto] = useState("Hola");
    const [arreglo, setArreglo] = useState(["Manzana","Uva"]);

    /*
    1) ejecutar el efecto en cada render de la pantalla 
    2) ejecutandolo en el primer render de la pagina/componente
    3) Observando un elemento 
    */

   //1) ejecutar el efecto en cada render de la pantalla 
    // useEffect(() => {
    //     console.log("render del useeffect detectado");
    // });
    
    //2) ejecutandolo en el primer render de la pagina/componente
    useEffect(() => {
        console.log("Primer render");
    },[]);

    //3) Observando un elemento 
        useEffect(() => {
            console.log("El arreglo cambio");
        },[arreglo]);

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

    const botonClickeado = ()=>{
        // const nuevoArreglo= arreglo
        // nuevoArreglo.push(texto);
        setArreglo([...arreglo,texto]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.delete('http://localhost:3001/deleteUser',{}); 
          console.log('Respuesta del servidor:', response);
          console.log('Respuesta del servidor:', response.data);
        } catch (error) {
          console.error('Error al enviar la solicitud POST:', error);
        }
      };
    return(
    <div>
        <h1>Ingrese el texto</h1>
        <input type="text" value={texto}  onChange={(event)=>{
            setTexto(event.target.value)
            }}/>
            
            <p>{texto}</p>
            
            <button onClick={handleSubmit}>DELETE USER FROM DB</button>

        <button onClick={botonClickeado}>Agregar fruta</button>
            {/* {
               texto&&<Texto/>
            } */}

            { texto ? <Texto textoMostrar={texto} funcionEjecutar={()=>{setTexto("")}}/>  :<p>No hay nada que mostrar</p> }
            { texto ? <Texto textoMostrar={texto} funcionEjecutar={()=>{setTexto("Ya no esta limpio")}}/>  :<p>No hay nada que mostrar</p> }
            {
                multiple()
            }
            {
                 arreglo.map(item =>{
                    return <p><button onClick={()=>{setTexto(item)}}>{item}</button></p>
                })
                
            }
        
    </div>
    )
};

export default Lista;