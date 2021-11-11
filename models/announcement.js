const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const AnnouncementSchema = new Schema({
    id: {
      type: String,
      required: true
    },
    timeStamp: {
      type: String,
      required: true
    },
    date: {
        type: String,
        required: true
    },
    note: {
      type: String,
      required: true
    }
    
  
  });
  module.exports = announcement = mongoose.model("Announcement", AnnouncementSchema);