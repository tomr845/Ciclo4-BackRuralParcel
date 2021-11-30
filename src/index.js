//Importaciones para levantar el servidor
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');

const port = 8000;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let dbConector = require('./dbConector');

/*********
 * Rutas
 *********/
app.post('/credenciales', async (req, res) => {
    let data = await dbConector.findData('credenciales', {
        correo: req.body.txtCorreo,
        contrasena: req.body.txtContrasena
    })
    res.send(data);
})

app.listen(port, () => {
    console.log(`escuchando por la url http://localhost:${port}`)
})

//aca se sabe que la conexion es correcta
/*
dbConector.probarConexion().then(function(e) {
    console.log('Promesa correcta, el return de la promesa es: ' + e)
})
*/

//Probando si la busqueda a la coleccion de la bd devuelve datos
/*
dbConector.findData('credenciales',{
    id_user: 111
}).then(function(e) {
    console.log(e);
});
*/