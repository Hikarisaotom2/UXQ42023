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
            // request , response
app.get('/',(req,res)=>{
    console.log('Recibi una peticion');
    res.send('Hola desde el servidor');
} )
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

