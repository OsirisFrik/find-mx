'use strict'

const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const fs = require('fs');

const Persona = require('../models/persona');

var apiCtrl = {};

apiCtrl.personas = function (req, res) {

  Persona.find().exec((err, personas) => {
    if (err) {
      console.log(err);
      res.status(400).send({error: 'ocurrio un error'});
    } else {
      res.status(200).send(personas);
    }
  });
}

apiCtrl.getImage = function (req, res) {
  var imageFile = req.params.file;
  console.log(imageFile);
  var path_file = './uploads/img/personas/' + imageFile;

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(404).send({message: 'No se ha encontrado la imagen'})
    }
  });
}

module.exports = apiCtrl;
