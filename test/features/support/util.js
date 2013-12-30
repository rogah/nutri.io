'use strict';

module.exports.mixin = function () {

  var i, property, length = arguments.length,
    child = {};

  for (i = 0; i < length; i += 1) {
    for (property in arguments[i]) {
      if (arguments[i].hasOwnProperty(property)) {
        child[property] = arguments[i][property];
      }
    }
  }

  return child;
};
