const express = require('express');
const app = express();

global._rootPath = require('path').resolve(__dirname);
console.log(global._rootPath);

require('./express')(app);
// configure routes
require('./routes')(app);

app.get('/', function (req, res) {
  res.send('Welcome to Weather forecast API :)');
});

app.listen(3030, function () {
  console.log('Weather forecast server listening on port 3030!');
});

module.exports = app;