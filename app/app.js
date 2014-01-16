'use strict';

var express = require('express'),
  config = require('./lib/config'),
  log = require('./lib/log')(module);

var app = express();

app.set('port', config.get('PORT'));

app.use(app.router);

app.use(function (req, res, next) {
  res.status(404);
  log.debug('Not found URL: %s', req.url);
  res.send({
    error: 'Not found'
  });
  return;
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  res.send({
    error: err.message
  });
  return;
});

app.get('/', function (req, res) {
  res.send('About Nutri');
});

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.get('/ErrorExample', function (req, res, next) {
  next(new Error('Random error!'));
});

module.exports = app;
