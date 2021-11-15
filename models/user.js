const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    blacklist: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    waiver: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)