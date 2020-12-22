const MongoClient = require('mongodb').MongoClient;
const CONFIG  = require('./config');

let _db;

function initDBConnection(done) {
    MongoClient.connect(CONFIG.MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        _db = client.db('Mass_Zipcodes');
        if (done) done();
        else console.info('Connected to Weather Mongo database.');
    }).catch(error => console.error(error));    
}

function getDbClient() {
    return _db;
}

module.exports = {
    getDbClient,
    initDBConnection
};