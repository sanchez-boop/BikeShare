const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    dateRented: {
        type: String,
        required: false
    },
    id: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    serialNumber: {
        type: String,
        required: false
    },
    customerID: {
        type: String,
        required: false
    },
    availability: {
        type:Boolean,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('bikes', bikeSchema)
