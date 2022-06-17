// Tag Document Schema
const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})
tagSchema.virtual('url').get(function(){
    return '/tag/' + this._id;
});
module.exports = mongoose.model('tags', tagSchema);