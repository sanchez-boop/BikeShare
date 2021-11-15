const mongoose = require('mongoose')

const repairSchema = new mongoose.Schema({
    bikeModel: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    id: {
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
    }
})

module.exports = mongoose.model('repairs', repairSchema)