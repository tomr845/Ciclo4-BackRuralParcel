const mongoose = require("mongoose");

const CredencialSchema = new mongoose.Schema({

    cedula: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    contrasena: {
        type: String,
        required:true,
    },
    telefono: {
        type: String,
        required:false,
    },
});

const Credenciales = mongoose.model("credenciales", CredencialSchema);

module.exports = Credenciales;