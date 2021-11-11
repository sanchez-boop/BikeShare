const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const RepairSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  bikeModel: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  customerID: {
    type: String,
    required: true
  }
  

});
module.exports = repair = mongoose.model("Repairs", RepairSchema);