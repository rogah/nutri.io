'user strict';

var app = require('./app/app'),
  config = require('./app/lib/config'),
  log = require('./app/lib/log')(module);

log.info('Server started at ' + new Date().toISOString());

app.listen(config.get('PORT'), function () {
  log.info('Server listening on port ' + config.get('PORT'));
  log.info('Environment is ' + config.get('NODE_ENV'));
});
