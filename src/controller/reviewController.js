const mongoose = require ("mongoose")
const reviewModel = require ("../model/review")

const createReview = async function (req,res){
  try{  let data = req.body
    if (!Object.keys(data).length) return res.status(400).send({msg:"body should not be empty"})
    let allData = await reviewModel.create(data)
    res.status(201).send({status:true, msg:allData})
}
catch(error){
    res.status(500).send({msg:error.message})}
}
module.exports ={createReview}