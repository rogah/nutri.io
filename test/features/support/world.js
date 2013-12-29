'use strict';

var zombie = require('zombie'),
  should = require('should'),
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