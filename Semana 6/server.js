//Importando express 
const express = require('express')
//Init express
const app = express()
//Definir el puerto
let port = 3000;
//Levantar el servidor
app.listen(port,()=>{
    console.log("SERVIDOR EJECUTANDOSE CORRECTAMENTE EN EL PUERTO ",port);
})

console.log('Esta linea esta despues del .listen');
//Callback
//GET ->obtener informacion 
//SET -?Agregar informacion
//PUT/UPDATE -> Update
//DELETE -> BORRAR INFORMACION


// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
            // request , response

/*
1) procesar/ aceptar la solicitud 
2) cuerpo ....
3) respuesta */

/* /CrearUsuarioNuevo
*/

//Endpoint
                // req ->request
                //res -> response 
app.get('/hola',(req,res)=>{
    console.log('Recibi una peticion');
    res.status(200).send("Hola desde mi server :)");
    //res.send('Hola desde el servidor');
} )


