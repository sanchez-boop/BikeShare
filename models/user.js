const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  waiver: {
    type: Boolean,
    required: true
  },
  blacklist: {
    type: Boolean,
    required: true
  },
  role: {
    type: String,
    required: true
  }
  

});
module.exports = user = mongoose.model("Users", UserSchema);
