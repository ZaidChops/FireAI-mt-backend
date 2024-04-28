const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
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