const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    com_by:{
        type:String,
        required:true
    }
})
commentSchema.virtual('url').get(function(){
    return '/comment/' + this._id;
});
module.exports = mongoose.model('comments', commentSchema);