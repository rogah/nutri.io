'use strict';

var config = require('../../../app/lib/config');

module.exports.pageBase = {

  visit: function (callback) {
    this.browser.visit('http://localhost:' + config.get('PORT') + this.path, callback);
  }
};
