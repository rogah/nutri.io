var nconf = require('nconf');

nconf
  .argv()
  .env()
  .file({
    file: 'config.json'
  })
  .defaults({});

module.exports = nconf;
