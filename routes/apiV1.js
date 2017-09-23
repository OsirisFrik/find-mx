'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const api = require('../controllers/apiV1');

var route = express.Router();

route.get('/personas', api.personas);
route.get('/images/:file', api.getImage);

module.exports = route;
