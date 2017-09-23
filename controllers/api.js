'use strict'

const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const fs = require('fs');

const Persona = require('../models/persona');

var apiCtrl = {};

apiCtrl.personas = function (req, res) {
  var limit = req.query.limitTo || 15;
  var page = req.query.page || 1;
  var skip = 0;

  if (page > 1) {
    skip = (limit*page)-limit;
  }

  Persona.find().exec((err, personas) => {
    if (err) {
      console.log(err);
      res.status(400).send({error: 'ocurrio un error'});
    } else {
      res.status(200).send(personas);
    }
  });
}

module.exports = apiCtrl;
