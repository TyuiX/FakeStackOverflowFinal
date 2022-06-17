const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    reputation:{
        type:Number, 
        default:100
    },
    date:{
        type:Date,
        default: new Date()
    },
    question:[{type: mongoose.Schema.Types.ObjectId, ref: 'questions'}],
    answer:[{type: mongoose.Schema.Types.ObjectId, ref: 'answers'}],
    comment:[{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    createdTag:[{type: mongoose.Schema.Types.ObjectId, ref: 'tags'}]


})
module.exports = mongoose.model('account', accountSchema);