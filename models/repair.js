const mongoose = require('mongoose')

const repairSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('repairs', repairSchema)
