const mongoose = require('mongoose')

const UserScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    username: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true }
    
},
    { collection: 'users'}
)

const model = mongoose.model('UserSchema', UserScehma)

module.exports = model