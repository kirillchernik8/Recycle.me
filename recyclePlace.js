const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema ({
  address: String,
  latitude: String, 
  longitude: String
})

module.exports = mongoose.model('Place', placeSchema)