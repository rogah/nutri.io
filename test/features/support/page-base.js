'use strict';

module.exports.pageBase = {

  visit: function (callback) {
    this.browser.visit('http://localhost:9001' + this.path, callback);
  }
};
