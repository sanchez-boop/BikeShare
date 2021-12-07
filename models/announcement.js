const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    timeStamp: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    },
    note: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('announcements', announcementSchema)
