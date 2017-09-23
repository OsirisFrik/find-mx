'use strict'

const moment = require('moment');

var registro = {};

const Persona = require('../models/persona');
const messages = require('./message');

registro.registrar = function(req, res) {
  res.render('registro');
}

registro.registro = function(req, res) {
  var userId = req.params.id;
  var file_name = '';

  req.checkBody('name', 'Se requiere un nombre.').notEmpty();
  req.checkBody('age', 'Se requiere una edad').notEmpty();
  req.checkBody('state', 'Se requiere un estado').notEmpty();
  req.checkBody('sex', 'Se requiere un sexo').notEmpty();

  var errors = req.validationErrors();

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
      var persona = new Persona();
      var datos = req.body;

      if (errors) {
        console.log(errors);
        res.render('registro', {
          title: 'Registrar',
          error: errors
        });
      } else {
        persona.full_name = datos.name;
        persona.age = datos.age;
        persona.sex = datos.sex;
        persona.last_location = datos.last_location;
        persona.state = datos.state;
        persona.contact = {
          parent: datos.contact_parent,
          full_name: datos.contact_name,
          email: datos.contact_email,
          phone: datos.contact_phone,
          country_code: datos.contact_countryCode
        };
        persona.caract = datos.caract;
        persona.image = data.image;
        persona.timestamp = moment().unix();

        persona.save((err, save) => {
          if (!err) {
            messages.message = 'Se ha guardado el registro';
            res.redirect('/');
          }
        });
      }
    } else {
      res.render('registro', {
        title: 'Registrar',
        error: {
          message: 'Extención de la imagen no valida.',
          param: 'image'
        }
      });
    }
  } else {
    res.render('registro', {
      title: 'Registrar',
      error: {
        message: 'No se ha subido ninguna imagen.',
        param: 'image'
      }
    });
  }
}

module.exports = registro;
