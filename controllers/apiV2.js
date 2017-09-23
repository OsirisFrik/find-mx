'use strict'

const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const fs = require('fs');

const Persona = require('../models/persona');

var apiCtrl = {};

apiCtrl.personas = function (req, res) {
  var limit = req.query.limitTo || 15;
  var page = req.query.page || 1;

  limit = JSON.parse(limit);
  page = JSON.parse(page);

  Persona.paginate({}, {page: page, limit: limit}, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({error: 'ocurrio un error'});
    } else {
      res.status(200).send(result);
    }
  });
}

module.exports = apiCtrl;
