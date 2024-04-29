const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model('Todo',todoSchema)