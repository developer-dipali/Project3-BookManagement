const mongoose = require('mongoose')
const ObjectId= mongoose.Schema.Types.ObjectId

const reviewSchema = mongoose.Schema({
    bookId: {type:ObjectId, require:true, ref:'book'},
    reviewedBy: {type:String,require: true, default :'Guest'},
    reviewedAt: {type:Date,require: true},
    rating : {type:Number, minlength: 1, maxlength: 5, require:true},
    review : {type:String},
    isDeleted: {type: Boolean, default: false}
},{timestamps:true});

module.exports=mongoose.model('review',reviewSchema)