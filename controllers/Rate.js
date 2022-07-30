'use strict';

var utils = require('../utils/writer.js');
var Rate = require('../service/RateService');

module.exports.rate = function rate (req, res, next) {
  Rate.rate()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
