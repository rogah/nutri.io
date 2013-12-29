'use strict';

var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('About Nutri');
});

module.exports = app;