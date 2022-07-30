'use strict';

var utils = require('../utils/writer.js');
var Subscription = require('../service/SubscriptionService');

module.exports.sendEmails = function sendEmails (req, res, next) {
  Subscription.sendEmails()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.subscribe = function subscribe (req, res, next) {
  var email = req.swagger.params['email'].value;
  Subscription.subscribe(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
