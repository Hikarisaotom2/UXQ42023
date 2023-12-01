import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Formulario = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    useEffect(()=>{
        // getUsuarios();
    });
    const updateInformation = async () =>{
        try {
            let usuario = {
                nombre: nombre,
                apellido:apellido,
                correo: correo
            }
            const response = await axios.put('http://localhost:3001/updateUser',usuario,{
                headers:{
                    "Content-Type":'application/x-www-form-urlencoded'
                }
            });
            console.log('Respuesta del update usuario', response);
        setMensaje(response.data)
            await getUsuarios();
        } catch (error) {
            console.log('Algo salio mal');
            setMensaje(error)
        }
    } 
    const getUsuarios = async () =>{
        try{
            const response = await axios.get('http://localhost:3001/getInfo');
            setUsuarios(response.data.documentos);
            console.log('El response del get es ', response.data.documentos);
        }catch(error){
            console.log('Error con los usuarios, ', error);
        }
    }
    const crearUsuario = async () => {
        try {
            let usuario = {
                nombre: nombre,
                apellido:apellido,
                correo: correo
            }
            const response = await axios.post('http://localhost:3001/createUser',usuario,{
                headers:{
                    "Content-Type":'application/x-www-form-urlencoded'
                }
            });
            console.log('Respuesta del usuario', response);
            setMensaje(response.data)
            await getUsuarios();
        } catch (error) {
            console.log('Algo salio mal');
            setMensaje(error)
        }
    }
    return (

        <div>
            <p>Ingrese el nombre del usuario</p>
            <input type="text" placeholder='Nombre' onChange={(event) => {
                setNombre(event.target.value)
            }} />
            <p> Ingrese el apellido</p>
            <input type="text" placeholder='Apellido' onChange={(event) => {
                setApellido(event.target.value)
            }} />
            <p> Ingrese el correo</p>
            <input type="text" placeholder='Correo' onChange={(event) => {
                setCorreo(event.target.value)
            }} />
            <br></br><br></br>
            <p>{nombre}</p>
            <p>{apellido}</p>
            <p>{correo}</p>
            <button onClick={crearUsuario}> Crear Usuario</button>
            <button onClick={updateInformation}> Actualizar informacion</button>
            {mensaje && <p>{mensaje}</p>}
            {
                usuarios.map((item)=>{
                    return <p>{item.nombre}</p>
                })
            }
        </div>

    );
}


export default Formulario;