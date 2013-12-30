'use strict';

require('should');

var zombie = require('zombie'),
  PageFactory = require('./page-factory').PageFactory;

var World = function World(callback) {

  var browser = new zombie(),
    factory = new PageFactory(browser);

  this.browser = browser;

  this.page = function (pageName) {
    return factory.create(pageName);
  };

  callback();
};

exports.World = World;
