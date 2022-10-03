const express = require('express');
const cors = require('cors');
const conectarDB  = require('./db/config')
require('dotenv').config({ path: '.env' });
// Lee el archivo .env cuando la aplicacion carga
require('dotenv').config();

// Crear el servidro/aplicacion de express
const app = express();

// Coneccion a la Base de Datos
conectarDB();

//Imprime variables de entorno
//console.log( process.env );

//Directorio público
app.use( express.static('public') )


// CORS
//Definimos de donde vamos a recibir peticiones
app.use( cors() );

// Para leer y parse del body viene en el json
app.use( express.json() );

// Peticion GET: Cuando sea localhost:4000; haga lo siguiente
// req : Peticion
// res : Respuesta 
/*
app.get('/', (req,res )=> {
    res.json({
        ok: true,
        msg: "Todo Oke",
        uid: 1234
    });
})
*/

// Configurando Rutas
//1: localhost:4000/api/auth
app.use( '/api/auth', require('./routes/auth'));

// levanta la aplicación
// Utilizando Variables de entorno
app.listen(  4000 , () => {
    console.log('Servidor corriendo en puerto ${ 4000 }');
});