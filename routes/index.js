'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const indexCtrl = require('../controllers/index');
const registroCtrl = require('../controllers/registro');
const md_upload = multipart({uploadDir: './uploads/img/personas'});

var route = express.Router();

route.get('/', indexCtrl.home);
route.get('/registrar', registroCtrl.registrar);
route.post('/registrar', md_upload, registroCtrl.registro);
route.get('/getPersonaImg/:imageFile', indexCtrl.getImageFile);
route.post('/test', function (req, res) {
  res.send('hola');
})

module.exports = route;
