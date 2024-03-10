const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },
    opened: {
         type: Boolean,
         required: true,
    },
    enrollment: {
        type: Number,
      
    },
    image: {
        type: String,
        default: null

    },
    slot: {
        type: String,
        default: null

    },
    branch: {
        type: String,
        default: null

    }
})

const User= mongoose.model('User', userSchema)
module.exports={User}