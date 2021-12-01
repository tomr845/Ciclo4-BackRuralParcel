//importacion de la libreria de conexion
let clienteMongo = require('mongodb').MongoClient;

//Configuracion de la base de datos
let {connectionString, dbName} = require('./dbConfig');


async function probarConexion() {
    try {
        let conexion = await clienteMongo.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let bd = conexion.db(dbName);
        let numeroCollection = (await bd.collections()).length;

        return numeroCollection > 0;

    } catch (excepcion) {
        return false;
    }
}


async function findData(collectionName, filter) {
    try {
        let conexion = await clienteMongo.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let bd = conexion.db(dbName);
        let collection = bd.collection(collectionName);
        let cursor = collection.find(filter);
        let result = [];
        let actualDocumento = await cursor.next();

        while(actualDocumento) {
            result.push(actualDocumento);
            actualDocumento = await cursor.next();
        }

        return result;

    } catch (excepcion) {
        return null;
    }
}

module.exports.probarConexion = probarConexion;
module.exports.findData = findData;