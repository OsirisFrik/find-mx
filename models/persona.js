'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Persona = Schema({
  full_name: String,
  age: Number,
  last_location: String,
  sex: String,
  state: String,
  contact: {
    parent: String,
    full_name: String,
    email: String,
    phone: Number,
    country_code: Number
  },
  caract: String,
  image: String,
  find: Boolean
});

module.exports = mongoose.model('personas', Persona);
