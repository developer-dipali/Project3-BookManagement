const jwt = require('jsonwebtoken');
const bookModel = require('../model/bookModel');

const authorization = async function (req,res,next){
    let token = req.headers["my-api-key"]
    if(!token){return res.status(400).send({status:false,msg:"please enter token"})}
    console.log(token)
    let bookId =req.params.bookId
    console.log(bookId)
    if(!bookId){return res.status(400).send({status:false,msg:"please enter bookId"})}
 
    let bookDetails= await bookModel.findOne({_id:bookId})
    if(!bookDetails){return res.status(404).send({status:false,msg:"bookDetails not found"})}
 
    let decodedToken = jwt.verify(token,"functionUp_uranium")
    if(!decodedToken){return res.status(400).send({status:false,msg:"please enter valid token"})}

 console.log(decodedToken)
    if(bookDetails.userId!=decodedToken.userId){
      return res.status(400).send({msg:"jwt validation failed"})}
    next()

}

module.exports= {authorization}
