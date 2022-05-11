const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bookModel = require('../model/bookModel');

const authorization = async function (req,res,next){
    let token = req.headers['my-api-key']
    console.log(token)
    let bookId =req.params.bookId
    let bookDetails= await bookModel.findOne({_id:bookId})
    //console.log(bookDetails)
    let decodedToken = jwt.verify(token,"functionUp_uranium")
    console.log(decodedToken)
    if(bookDetails.userId!=decodedToken.userId)
      return res.status(400).send({msg:"jwt validation failed"})
    next()

}

module.exports= {authorization}