const mongoose = require('mongoose');
const databaseConnection = require('../databaseConnections');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {type: String, require: true}, 
    surname: {type: String, require: true}, 
    nationality: {type: String, require: true}, 
    rid: {type: String, require: true}
})

const Employee_D = databaseConnection.dixie.model("Employee", employeeSchema);
const Employee_G = databaseConnection.gazelle.model("Employee", employeeSchema);

module.exports = {
    Employee_D, 
    Employee_G
}