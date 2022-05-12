const mongoose = require('mongoose')
const moment = require ("moment")
const ObjectId= mongoose.Schema.Types.ObjectId

const reviewSchema = mongoose.Schema({
    bookId: {type:ObjectId, require:true, ref:'book',trim:true},
    reviewedBy: {type:String,require: true, default :'Guest',trim:true},
    reviewedAt: {type:Date,default:moment(Date.now()).format("YYYY-MM-DD"),require: true},
    rating : {type:Number, minlength: 1, maxlength: 5, require:true},
    review : {type:String},
    isDeleted: {type: Boolean, default: false}
},{timestamps:true});

module.exports=mongoose.model('review',reviewSchema)