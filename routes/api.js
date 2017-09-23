'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const api = require('../controllers/api');

var route = express.Router();

route.get('/personas', api.personas)

module.exports = route;
