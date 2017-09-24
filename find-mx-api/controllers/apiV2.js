'use strict'

const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const fs = require('fs');

const Persona = require('../models/persona');

var apiCtrl = {};

apiCtrl.personas = function (req, res) {
  var limit = req.query.limit || 15;
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

apiCtrl.registro = function (req, res) {
  if (req.files && req.files.image) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[3];
    var ext_split = file_name.split('.');
    var ext_file = ext_split[1];
    var data = {
      image: file_name
    };
    console.log(data);
    console.log(req.body);
  }
}

module.exports = apiCtrl;
