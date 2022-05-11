const mongoose = require ('mongoose')
const { send } = require('process')
const moment =require ('moment')
const jwt = require("jsonwebtoken")

const bookModel=require('../model/bookModel')

const createBook= async function (req,res) {

try{
    let data =req.body
    // ________________________validation____________________
    if(!Object.keys(data).length) return res.status(400).send({msg:"enter the all data"})
    if(!data.title) return res.status(400).send({msg:"title required"})
    if(!data.userId) return  res.status(400).send({msg:"userId required"})
    if(!data.category) return  res.status(400).send({msg:"category required"})
    if(!data.subcategory) return  res.status(400).send({msg:"subcategory required"})
    if(!data.excerpt) return res.status(400).send({msg:"need to fill it"})

let title = await bookModel.findOne({title:data.title})
if(title) return  res.status(400).send({msg:"title already exists"})


    if (!data.ISBN) return res.status(400).send({})
 let isbn =    await bookModel.findOne({ISBN:data.ISBN})
   if (isbn) return res.status(400).send({msg:" isbn exists"})

let allData = await bookModel.create(data)
res.status(201).send({status:true,msg:"successfully created",data:allData})
}
catch(error){
    res.status(500).send({msg:error.message})}
}
//🐶🐶🐶🐶🐶🐶🐶getbooks by query param🐶🐶🐶🐶🐶🐶🐶🐶
const getBooks = async function(req,res){
 try{   let data =req.query
    if(!data) return res.status(400).send({msg:"data is missing"})
    let a =data.category
    findData = await bookModel.findOne({$or:
        [{userId:data.userId},{category:a},{subcategory:data.subcategory}]})
    if(!findData) return res.status(400).send({msg:"input data is incorrect"})   
       // console.log(findData)
 res.status(200).send({msg:findData})       
}
catch(error){
    res.status(500).send({msg:error.message})}
  }
    

//🐨🐨🐨🐨🐨🐨🐨🐨 delete=true🐨🐨🐨🐨🐨🐨🐨🐨🐨🐨
const deletedBook = async function(req,res){
 try{

    let data = req.params.bookId
   let dBook = await bookModel.findByIdAndUpdate({_id:data},{$set:{isDeleted:true,deletedAt:Date()}},{new:true})
   res.status(200).send({data:dBook})
}
catch(err){res.status(500).send(err.message)}
}

module.exports={createBook,getBooks,deletedBook}