'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const api = require('../controllers/apiV2');
const md_upload = multipart({uploadDir: './uploads/img/personas'});

var route = express.Router();

route.get('/personas', api.personas);
route.post('/registro', md_upload, api.registro)

module.exports = route;
