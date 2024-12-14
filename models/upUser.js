const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const upUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('UpUser', upUserSchema);
