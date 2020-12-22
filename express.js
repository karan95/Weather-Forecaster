'use strict';

const compression    = require('compression');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const initDBConnection = require('./mongodb').initDBConnection;

module.exports = function (app) {

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // initialize mongo connection
    initDBConnection();
    app.use(cors());
};
