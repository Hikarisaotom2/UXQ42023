//Importando express 
const express = require('express')

//Importar otras librerias
const path = require('path'); 
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const { initializeApp } =require("firebase/app");
const  { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } = require( "firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyC6nEe2OZ-r0OnXAzUZDtN-Ft7cn_J5l-Q",
  authDomain: "mibackend-uxq22023.firebaseapp.com",
  projectId: "mibackend-uxq22023",
  storageBucket: "mibackend-uxq22023.appspot.com",
  messagingSenderId: "588483010547",
  appId: "1:588483010547:web:cde029c31abf28e1783c86",
  measurementId: "G-G8G80KHK1C"
};

const uri = "mongodb+srv://admin2:12345HolaMundo@cluster0.hkay5rx.mongodb.net/?retryWrites=true&w=majority";
//Init express
const app = express()

//Crear coneccipn con la base de datos de mongo 
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  run().catch(console.dir);

//Definir el parser 
var urlEncodeParser= bodyParser.urlencoded({extended:true});
//Definir el puerto
let port = 3001;

//Utilizar / set el parser
const firebaseApp = initializeApp(firebaseConfig);
app.use(urlEncodeParser);
app.use(cors()) 

//Levantar el servidor
app.listen(port,()=>{
    console.log("SERVIDOR EJECUTANDOSE CORRECTAMENTE EN EL PUERTO ",port);
})

console.log('Esta linea esta despues del .listen');
//Callback
//Endpoint
app.get('/hola',(req,res)=>{
    console.log('Recibi una peticion');
    let calculo = 0;
    res.status(200).send("Hola desde mi server :)");
} )

app.get('/getInfo',async (req,res)=>{
  try {
    const client = new MongoClient(uri);
 
    const database = client.db("claseUX");
    const usuarios = database.collection("usuarios");

    const query = {nombre: "claudia"  };
    
    const options = {
      // Sort returned documents in ascending order by title (A->Z)
      sort: { correo: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, correo: 1,nombre:1, usuario:1, campoquenoexisteprueba:1},
    };
    // Execute query 
    //const cursor = usuarios.find(query, options);
    const cursor = usuarios.find({},options);
    // // Print a message if no documents were found
    // if ((await usuarios.countDocuments(query)) === 0) {
    //   console.log("No documents found!");
    //   res.status(200).send("No se encontraron registros");
    // }
    // Print returned documents
    let arr = []
    for await (const doc of cursor) {
      console.dir(doc);
      arr.push(doc)
    }
    res.status(200).send({
      documentos: arr,
    });
  }catch (error){
    res.status(500).send("No se pudo ejecutar la query....");
  } finally {
    await client.close();
  }

} )

app.delete('/deleteUser',async (req,res)=>{
  try {
    const client = new MongoClient(uri);
    const database = client.db("claseUX");
    const usuarios = database.collection("usuarios");
    const query = {_id: new ObjectId('65652ea50511bf5c83f185cf')};
    const result = await usuarios.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      res.status(200).send("Se borro algo exitosamente");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      res.status(200).send("Ningun documento hizo match con la busqueda, no se elimino nada");
    }
  }catch(error){
    res.status(500).send("Algo salio mal, no pudimos borrar el documento");
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
  
} )

app.put('/updateUser',async (req,res)=>{
  try {
    const client = new MongoClient(uri);
    const database = client.db("claseUX");
    const usuarios = database.collection("usuarios");
    // Crear el filtro para la informacion
    const filter = { nombre: "claudia" };

    /* Upsert en true significa que si el documento no existe lo crea*/
    const options = { upsert: true };

    // Data con la que actualizaremos el documento.
    const updateDoc = {
      $set: {
        // correo: "clau_cortes@unitec.edu",
        // nuevoCampo: `el cuerpo del documento cambio completamente`
        ...req.body,
      },
    };
    // Actualizar el primer documento que haga match con el filtro 
    const result = await usuarios.updateOne(filter, updateDoc, options);
    
    // Print the number of matching and modified documents
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.status(200).send("Se actualizo la informacion correctamente");
  }catch (error){
    res.status(500).send("No se pudo actualizar la información")
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
   
} )


app.post('/createUser',async (req,res)=>{
    console.log('Recibi una peticion - post');
    try {
      const client = new MongoClient(uri);
      // Conectar con  a la base de datos, claseUX, si la base de datos existe nos conectamos y la usamos, sino, mongo crea la base de datos.
      const database = client.db("claseUX");
      const usuarios = database.collection("usuarios");
    // Documento a insertar 
      const doc = req.body;
      //insertar el documento en la coleccion 
      const result = await usuarios.insertOne(doc);
      console.log(`El resultado fue:  ${result}`);
      console.log(`El id del usuario que se creo es : ${result.insertedId}`);
      res.status(200).send("El usuario se creo exitosamente")
    }catch(error){
      res.status(500).send("No se creo el usuario, algo salio mal")
    } finally {
      await client.close();
    }
    
} )

    //Request , response
app.get('/getFile/:id',(req,res)=>{
    console.log('Recibi una peticion - REGRESAR HTML');
    console.log('El parametro que venia en la ruta  es ',  req.params.id);
    console.log('El parametro que venia en el body es ',  req.body.mensaje);
    console.log('El parametro que venia en el body es ',  req.body.correo);
    console.log('El parametro que venia en el body es ',  req.body.id);
    res.status(200).sendFile(path.join(__dirname+"/info.html"));
} )

//post
app.post("/createUserWithEmailAndPassword",  (req, res) => {
    const auth = getAuth(firebaseApp);
    const email = req.body.email;
    const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then((resp) => {
      res.status(200).send({
        msg: "Esta es la respuesta de firebase", 
        data: resp,
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).send({
        msg: "Error al crear el usuario", 
        errorCode: errorCode,
        errorMsg: errorMessage
      })
    
    });

})


app.post("/logIn",  (req, res) => {
  try{
    const auth = getAuth();
    const email = req.body.email;
    const password = req.body.password;
    signInWithEmailAndPassword(auth, email, password)
    .then((resp) => {
      res.status(200).send({
        msg: "Log in exitoso! :) ", 
        data: resp,
      })
    
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).send({
        msg: "Error al hacer log in", 
        errorCode: errorCode,
        errorMsg: errorMessage
      })
    });
  }catch(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(500).send({
      msg: "Error al hacer log in", 
      errorCode: errorCode,
      errorMsg: errorMessage
    })
  }
})

app.post("/logIn",  (req, res) => {
  try{
    const auth = getAuth();
    signOut(auth).then(() => {
     
    }).catch((error) => {
      // An error happened.
    });
  }catch(error){

  }
})


