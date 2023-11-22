//Importando express 
const express = require('express')

//Importar otras librerias
const path = require('path'); 
const bodyParser = require('body-parser');

//Init express
const app = express()

//Definir el parser 
var urlEncodeParser= bodyParser.urlencoded({extended:true});
//Definir el puerto
let port = 3000;

//Utilizar / set el parser
app.use(urlEncodeParser);

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
    let calculo = 0;
    res.status(200).send("Hola desde mi server :)");
    // if(calculo===0){
    //     res.status(404).send('error');
    // }else{
    //     res.status(200).send("Hola desde mi server :)");
    // }
    //res.send('Hola desde el servidor');
} )

app.get('/getInfo',(req,res)=>{
    console.log('Recibi una peticion - get #2');
    res.status(200).send({
        nombre:"Claudia",
        apellido:"Cortes",
        carrera:"Ing.Sistemas",
    });
} )


app.put('/MiPrimerPut',(req,res)=>{
    console.log('Recibi una peticion - put');
    res.status(200).send("Se deberia ejecutar un update por el put")
} )


app.delete('/deleteUser',(req,res)=>{
    console.log('Recibi una peticion - delete');
    res.status(200).send("<p>se elimino el usuario<p>")
} )

app.post('/createUser',(req,res)=>{
    console.log('Recibi una peticion - post');
    //.....
    //sendEmail()
    console.log("hola");
    res.status(200).send("Se creo el usuario exitosamente")
} )

app.get('/getFile',(req,res)=>{
    /* 1) parametros 
       2) usando el body
    */
    console.log('Recibi una peticion - REGRESAR HTML');
    console.log('El parametro que venia en el body es ',  req.body.mensaje);
    console.log('El parametro que venia en el body es ',  req.body.correo);

    res.status(200).sendFile(path.join(__dirname+"/info.html"));
} )

