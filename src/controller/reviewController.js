const mongoose = require ("mongoose")
const bookModel = require("../model/bookModel")
const reviewModel = require ("../model/review")
//const bookModel =require("../model/bookModel")

const createReview = async function (req,res){
  try{  let data = req.body
    if (!Object.keys(data).length) return res.status(400).send({msg:"body should not be empty"})
    if (!data.reviewedBy) return res.status(400).send({msg:"reviewedBy is mandatory"})
    if(!data.rating) return  res.status(400).send({msg:"rating is missing"})
    if(!data.bookId) return  res.status(400).send({msg:"bookId doesn't match"})
    let x = await bookModel.findOne({_id:data.bookId , isDeleted: false})
    if (!x) return res.status(404).send({msg:"book not found"})

    let allData = await reviewModel.create(data)
    res.status(201).send({status:true, msg:allData})
}
catch(error){
    res.status(500).send({msg:error.message})}
}



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