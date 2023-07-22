const mongoose = require('mongoose');

const dixie = mongoose.createConnection('mongodb+srv://cuylerjvv:KillermanMongoDb@cluster0.qbe6vst.mongodb.net/dixie?retryWrites=true&w=majority');
const gazelle = mongoose.createConnection('mongodb+srv://cuylerjvv:KillermanMongoDb@cluster0.qbe6vst.mongodb.net/gazelle?retryWrites=true&w=majority');

module.exports = {
    dixie, 
    gazelle
}