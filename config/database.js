const {MongoClient} = require('mongodb');
const uri = process.env.DB_URI;

const mongoose = require('mongoose');
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connectiong to mongodb"));
db.once('open',function(){
    console.log('Connected to mongodb');
})

module.exports = db;