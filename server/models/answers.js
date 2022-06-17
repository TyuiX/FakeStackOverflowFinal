// Answer Document Schema
const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    ans_by:{
        type:String,
        required:true
    },
    ans_date_time:{
        type:Date,
        default: new Date()
    },
    comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    vote:{
        type:Number,
        default:0
    }
})
answerSchema.virtual('url').get(function(){
    return '/answer/' + this._id;
});
module.exports = mongoose.model('answers', answerSchema);