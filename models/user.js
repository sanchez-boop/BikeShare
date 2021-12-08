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
    name: {
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
    },
    isVerified: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('users', userSchema)
