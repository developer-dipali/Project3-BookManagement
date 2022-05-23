const jwt = require('jsonwebtoken');
const bookModel = require('../model/bookModel');
const validator = require("../validator/validator.js")
//================ authorization ======================//

const authorization = async function (req, res, next) {
    try {
        let userId;
        let header = req.headers;
        let token = header["x-api-key"]
        let decodedToken = jwt.verify(token, "functionUp_uranium");
        let bookId = req.params.bookId;

        if (!validator.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "bookId is invalid" })
           } 

        let data = req.query
        if (Object.keys(data).length === 0) {
            userId = await bookModel.findOne({ _id: bookId }).select({ userId: 1, _id: 0 })
        }
        else {
            userId = await bookModel.findOne(data).select({ userId: 1, _id: 0 })
        }
        let _id = userId.userId.toString()
        let logId = decodedToken.userId;
        if (_id != logId) return res.status(401).send({status: false, msg: "Sorry,authorisation required  " });

       next()

    }


    catch (error) {
        return res.status(404).send({status : false, msg : error.message })
    }


}

//================ authentication ======================//

const authentication = async function (req,res,next){
 try{

  let token = req.headers['x-api-key']
  if(!token) 
  return res.status(400).send({status:false , msg:"token required"})
 // console.log(token)

  let decodedToken = jwt.verify(token,"functionUp_uranium")
  if(!decodedToken) 
  return res.status(401).send({status:false , msg:"token is invalid"})

    next()

  }
  catch(error){ 
    return res.status(500).send({status:false , msg:error.message})}
}
//=========================================
const bookAuthorization = async function (req,res,next){
  let token = req.headers['x-api-key']

  if(!token) return res.status(400).send({msg:"No token is present in Header file"})
  console.log(token)
   
  let userId =req.body.userId
 
  let decodedToken = jwt.verify(token,"functionUp_uranium")
  if(!decodedToken) 
  return res.status(401).send({status:false , msg:"token is invalid"})
 // console.log(decodedToken)

  if(userId!=decodedToken.userId)
    return res.status(400).send({status:false , msg:"jwt validation failed"})
  next()
}

module.exports= {authorization,authentication,bookAuthorization}