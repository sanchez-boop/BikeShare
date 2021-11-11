const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const BikeSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  dateRented: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  customerID: {
    type: String,
    required: true
  }
  

});
module.exports = bike = mongoose.model("Bikes", BikeSchema);