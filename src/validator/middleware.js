const jwt = require('jsonwebtoken');
const bookModel = require('../models/bookModel');

const authorization = async function (req,res,next){
    let token = req.headers[my-api-keys]
    let bookId =req.params.bookId
    let bookDetails= await bookModel.findOne({_id:bookId})
    let decodedToken = jwt.verify(token,"functionUp_uranium")

    if(bookDetails.userId!=decodedToken.userId)
      return res.status(400).send({msg:"jwt validation failed"})
    next()

}

module.exports= authorization