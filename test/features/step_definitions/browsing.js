'use strict';

module.exports = function () {

  this.World = require('../support/world').World;

  this.Given(/^I have visit the '\/'$/, function (callback) {
    this.page('home').visit(callback);
  });

  this.Then(/^I should see the home page$/, function (callback) {
    this.page('home').assertContent(callback);
  });
};
