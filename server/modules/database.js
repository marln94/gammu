var mongoose = require("mongoose");

var servidor = "localhost:27017";
var nombreBaseDatos ="gammu";

class Database{
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`)
        .then(()=>{
            console.log("Se conecto a la base de datos");
        })
        .catch(error=>{
            console.error(JSON.stringify(error));   
        });
    }

    conexion(){
        return mongoose.connection
    }
}


module.exports = new Database();