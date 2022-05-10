const mongoose = require ('mongoose')
const { send } = require('process')

const bookModel=require('../model/bookModel')

const createBook= async function (req,res) {

try{
    let data =req.body
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


module.exports={createBook}