const mongoose = require ('mongoose');
const databaseConnections = require('../databaseConnections');

const Schema = mongoose.Schema;

const weekSchemaDixie = new Schema ({
    firstDay: { type: Number}, 
    days: [{
        day: {type: Number}, 
        shifts: {
            dayshift: {
                cashier: {type: Object}, 
                attendantOne: {type: Object},
                attendantTwo: {type: Object},
                attendantThree: {type: Object}
            },
            nightshift: {
                cashier: {type: Object}, 
                attendantOne: {type: Object},
                attendantTwo: {type: Object},
                attendantThree: {type: Object}
            }
        }
    }]
})

const weekSchemaGazelle = new Schema ({
    firstDay: { type: Number}, 
    days: [{
        day: {type: Number}, 
        shifts: {
            dayshift: {
                cashier: {type: Object}, 
                attendantOne: {type: Object},
                attendantTwo: {type: Object},
                attendantThree: {type: Object}
            }
        }
    }]
})

const Week_D = databaseConnections.dixie.model("Week", weekSchemaDixie);
const Week_G = databaseConnections.gazelle.model("Week", weekSchemaGazelle);

module.exports = {
    Week_D, 
    Week_G
}