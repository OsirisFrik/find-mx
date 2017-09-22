'use strict'

const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const fs = require('fs');

const Persona = require('../models/persona');

var indexCtrl = {};

indexCtrl.home = function(req, res) {
  Persona.find((err, personas) => {
    console.log(personas);
  });
  res.render('index');
}

indexCtrl.registro = function(req, res) {
  var persona = new Persona();
  var datos = req.body;

  req.checkBody('name', 'Se requiere un nombre.').notEmpty();
  req.checkBody('last_name', 'Se requiere un apellido').notEmpty();
  req.checkBody('age', 'Se requiere una edad').notEmpty();
  req.checkBody('state', 'Se requiere un estado').notEmpty();
  req.checkBody('sex', 'Se requiere un sexo').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.status(200).send(errors);
  } else {

    persona.name = datos.name;
    persona.last_name = datos.last_name;
    persona.last_name2 = datos.last_name2;
    persona.age = datos.age;
    persona.sex = datos.sex;
    persona.last_location = datos.last_location;
    persona.state = datos.state;
    persona.contact = datos.contact;
    persona.caract = datos.caract;
    persona.image = datos.image;

    persona.save((err, personaSave) => {
      if (!err) {
        console.log(personaSave);
      } else {
        console.log(err);
      }
    });
  }
}

indexCtrl.uploadPicture = function (req, res) {
  var userId = req.params.id;
  var file_name = '';

  if (req.files && req.files.image) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[3];
    var ext_split = file_name.split('.');
    var ext_file = ext_split[1];
    var data = {
      image: file_name
    };
    if (ext_file == 'jpg' || ext_file == 'png' || ext_file == 'jpeg') {
      res.status(200).send(data);
    } else {
      res.status(200).send({messge: 'Extención del archivo no valida'});
    }
  } else {
    res.status(200).send({messge: 'No se ha subido ninguna imagen'});
  }
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
