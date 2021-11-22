const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    dateRented: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    availability: {
        type:Boolean,
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

module.exports = mongoose.model('bikes', bikeSchema)
