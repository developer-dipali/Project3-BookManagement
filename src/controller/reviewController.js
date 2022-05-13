const mongoose = require ("mongoose")
const bookModel = require("../model/bookModel")
const reviewModel = require ("../model/review")
const validator = require ("../validator/validator")


//============================================================== Create Review =================================================================//

const createReview = async function (req,res){
  try {
    const params = req.params
    const bookId = params.bookId
     
     //================ BookId validation from params =================//

    if (!validator.isValidObjectId(bookId)) {
        res.status(400).send({ status: false, message: `${bookId} is not a valid book id ` })
        return
    }

    let book = await bookModel.find({ _id: bookId, isDeleted: false });

    if (!book) {
        return res.status(400).send({status:false, message:"No such book exists" });
    }

    let bookData = req.body;

     //================ BookData validation =================//

    if (!validator.isValidRequestBody(bookData)) {
        res.status(400).send({ status: true, message: 'No parameters passed. Book unModified' })
        return
    }

     //================ extracting parameters  =================//
      
     const review = bookData.review
     const reviewedBy = bookData.reviewedBy
     const rating = bookData.rating
     const BookId = bookData.bookId

     //================  BookId validations  =================//

     if (!BookId){
      return res.status(400).send({ status: false, message: " Please enter Your bookId " })
     }

       if (!validator.isValidObjectId(BookId)) {
       return res.status(400).send({ status: false, message: `${bookId} is not a valid book id ` })
      }

      if (!(params.bookId === bookData.bookId)) {
        return res.status(400).send({ status: false, message: "BookIds are different " })
       }

       //================ reviewBy validation =================//

       if (typeof reviewedBy === "string" && reviewedBy.trim().length === 0) {
        return res.status(400).send({ status: false, Message: "please enter Valid reviewedBy" })
    }
    
    //================ review validation =================//

      if (!validator.isValid(review)) {
          return res.status(400).send({ status: false, Message: "please enter Valid review" })
      }

      //================ rating validation =================//

      if (!rating){
        return res.status(400).send({ status: false, message: " Please enter Your rating " })
       }

       if(!(rating>=1 && rating<=5)){
        return res.status(400).send({ status: false, msg: "Rating should be in between 1-5 " })
        }

         //================ validation End Here ===================//

        const Book = await bookModel.findOneAndUpdate({_id:BookId , isDeleted:false } ,{ $inc:{reviews:1} } , {new:true}) 
       
        let BookReview = await reviewModel.create(bookData)
        res.status(201).send({status:true, Data:{ Book , reviewdata : BookReview}})
        
      }

      catch(error){
    res.status(500).send({ status:false , message:"server error" , msg:error.message})}
     }

//=============================================================== Update Review ==================================================================//


const updateReview = async (req,res)=>{
  let data =req.params.reviewId
  let a = req.body
  let review = await reviewModel.findOne({_id:data , isDeleted: false})
  console.log(review)
   let BookId =review.bookId
  // console.log(BookId)

  let book = await bookModel.findOne({_id:BookId, isDeleted: false})
  console.log(book)
  if(!book ) return res.status(400).send({msg:"bookId is deleted"})
  const rUpdate= await reviewModel.findOneAndUpdate({_id:data},{$set:a},{new:true})
  res.status(200).send({msg:rUpdate})
}


module.exports ={createReview,updateReview}