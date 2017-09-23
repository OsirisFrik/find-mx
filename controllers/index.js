'use strict'

const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const fs = require('fs');

const Persona = require('../models/persona');
const messages = require('./message');

var indexCtrl = {};

indexCtrl.home = function(req, res) {
  console.log(messages);
  Persona.find((err, personas) => {
    console.log(personas);
  });
  res.render('index', {title: 'Home', message: messages.message});
}

indexCtrl.getImageFile = function(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './uploads/img/personas/' + imageFile;

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(404).send({message: 'No se ha encontrado la imagen'})
    }
  });
}

module.exports = indexCtrl;
