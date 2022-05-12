const jwt = require('jsonwebtoken');
const bookModel = require('../model/bookModel');

const authorization = async function (req,res,next){
    let token = req.headers['my-api-key']
    if(!token) return res.status(400).send({msg:"token required"})
    console.log(token)
    let bookId =req.params.bookId 
   let bookDetails= await bookModel.findOne({_id:bookId})
    //console.log(bookDetails)
    let decodedToken = jwt.verify(token,"functionUp_uranium")
    if(!decodedToken) return res.status(401).send({msg:"token is invalid"})
   // console.log(decodedToken)
    if(bookDetails.userId=decodedToken.userId)
      return res.status(400).send({msg:"jwt validation failed"})
    next()

}
const authentication = async function (req,res,next){
 try{

  let token = req.headers['my-api-key']
  if(!token) return res.status(400).send({msg:"token required"})
 // console.log(token)
  let decodedToken = jwt.verify(token,"functionUp_uranium")
  if(!decodedToken) return res.status(401).send({msg:"token is invalid"})
    next()
  }
  catch(error){ return res.status(500).send({msg:error.message})}
}
module.exports= {authorization,authentication}