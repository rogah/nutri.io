'user strict';

var app = require('./app/app'),
  log = require('./app/lib/log')(module);

log.info('Server started at ' + new Date().toISOString());

app.listen(app.get('port'), function () {
  log.info('Server listening on port ' + app.get('port'));
  log.info('Environment is ' + app.get('env'));
});
