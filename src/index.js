//Importaciones para levantar el servidor
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');

//const port = process.env || 8000;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8000);

let dbConector = require('./dbConector');

//Importaciones de los modelos
const CredencialModel = require('./models/Credenciales');
const ParcelaModel = require('./models/Parcelas');

/*********
 * Rutas
 *********/

 app.get('/', async (req, res) => {

    res.send('Conexión establecida correctamente al servidor backend de RuralParcel');

})



app.post('/credenciales', async (req, res) => {

    let data = await dbConector.findData("credenciales", {
        correo: req.body.txtCorreo,
        contrasena: req.body.txtContrasena
    })
    res.send(data);
})


app.post('/registrar-usuario', async (req, res) => {

    const credencial = new CredencialModel({
        cedula: req.body.txtCedula,
        nombre: req.body.txtNombre,
        correo: req.body.txtCorreo,
        contrasena: req.body.txtContrasena,
        telefono: req.body.txtTelefono
    })

    try {
        await credencial.save();
        res.send(200);

    } catch(error) {
        res.send(500);
    }

})


app.post('/registrar-parcela', async (req, res) => {

    const parcela = new ParcelaModel({
        cantidad_hectarea: req.body.txtCantidadHectareas,
        ubicacion: req.body.cmbUbicacion,
        nombre_propietario: req.body.txtNombrePropietario,
        sistema_riego: req.body.cmbSistemaRiego,
        descripcion: req.body.txtDescripcion,
        opcion_servicio: req.body.cmbTipoServicio
    })

    try {
        await parcela.save();
        res.send(200);

    } catch(error) {
        res.send(500);
    }

})


app.get('/obtener-parcelas', async (req, res) => {

    ParcelaModel.find({}, (error, result) => {
        if(error) {
            res.send(error);
        }

        res.send(result);
    })

})


app.get('/parcela/:id', async (req, res) => {

    let id = req.params.id;

    ParcelaModel.find({_id:id}, (error, result) => {
        if(error) {
            res.send(error);
        }

        res.send(result);
    })

})

app.delete('/eliminar-parcela/:id', async (req, res) => {

    let id = req.params.id;

    ParcelaModel.findByIdAndRemove({_id:id}, (error, result) => {
        if(error) {
            res.send(error);
        }

        res.send(200);
    })
})


app.put('/actualizar-parcela/:id', async (req, res) => {

    let id = req.params.id;

    ParcelaModel.findByIdAndUpdate(id, {
        cantidad_hectarea: req.body.txtCantidadHectareas,
        ubicacion: req.body.cmbUbicacion,
        nombre_propietario: req.body.txtNombrePropietario,
        sistema_riego: req.body.cmbSistemaRiego,
        descripcion: req.body.txtDescripcion,
        opcion_servicio: req.body.cmbTipoServicio}, (error, result) => {
        if(error) {
            res.send(error);
        }

        res.send(200);
    })
    
})


app.listen(app.get('port'), ()=>{
    console.log("Puerto del API => ", app.get('port'));
});

/*
app.listen(port, () => {
    console.log(`API http://localhost:${port}`)
})

*/

//aca se sabe que la conexion es correcta
/*
dbConector.probarConexion().then(function(e) {
    console.log('Promesa correcta, el return de la promesa es: ' + e)
})
*/

//Probando si la busqueda a la coleccion de la bd devuelve datos

/*
dbConector.findData('credenciales',{
    correo: "tomas@correo.com"
}).then(function(e) {
    console.log(e);
});
*/
