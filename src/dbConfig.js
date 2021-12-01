
const mongoose = require("mongoose");

//Localmente
/* 
module.exports.connectionString = 'mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false';
module.exports.dbName = 'RuralParcelBD';
*/

mongoose.connect(
    "mongodb+srv://AppRuralParcel:MongoRuralParcel@ruralparcelbd.fneq4.mongodb.net/RuralParcelBD?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
    }
);

//MongoDB en la nube

module.exports.connectionString = 'mongodb+srv://AppRuralParcel:MongoRuralParcel@ruralparcelbd.fneq4.mongodb.net/RuralParcelBD?retryWrites=true&w=majority';
module.exports.dbName = 'RuralParcelBD';


