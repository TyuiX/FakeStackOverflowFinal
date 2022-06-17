// Question Document Schema
const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
    },
    text:{
        type:String,
        required:true
    },
    tags:[{type: mongoose.Schema.Types.ObjectId, ref: 'tags', required: true, minItems: 1}],
    answers:[{type: mongoose.Schema.Types.ObjectId, ref: 'answers'}],
    comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    asked_by:{
        type:String
    },
    ask_date_time:{
        type:Date,
        default: new Date()
    },
    views:{
        type:Number,
        default:0
    },
    vote:{
        type:Number,
        default:0
    }

})
module.exports = mongoose.model('questions', questionSchema);