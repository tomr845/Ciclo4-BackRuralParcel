const mongoose = require("mongoose");

const ParcelaSchema = new mongoose.Schema({

    cantidad_hectarea: {
        type: Number,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    nombre_propietario: {
        type: String,
        required: true,
    },
    sistema_riego: {
        type: String,
        required:true,
    },
    descripcion: {
        type: String,
        required:false,
    },
    opcion_servicio: {
        type: String,
        required:true,
    },
});

const Parcelas = mongoose.model("parcelas", ParcelaSchema);

module.exports = Parcelas;