'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const api = require('../controllers/apiV2');

var route = express.Router();

route.get('/personas', api.personas);
route.post('/registro', api.registro)

module.exports = route;
