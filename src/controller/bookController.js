const mongoose = require ('mongoose');
const { send } = require('process')
const moment = require('moment')
const validator = require("../validator/validator")

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



const updateBook = async function(req ,res) {
    try {
        const params = req.params 
        const bookId = params.bookId 
        

        // validation starts 
        if(!validator.isValidObjectId(bookId)){
            res.status(400).send({status:false , message:`${bookId} is not a valid book id `})
            return
            
        }

        let book = await bookModel.find({_id:bookId , isDeleted:false});

        if (!book) {
            return res.status(400).send("No such book exists");
        }

        let bookData = req.body;

        if( !validator.isValidRequestBody(bookData)){
          return  res.status(400).send({ status: true, message: 'No parameters passed. Book unModified' })
        
        } 

          // extract params
         let title = bookData.title
          let excerpt = bookData.excerpt
         // const releaseDate = bookData.releaseDate
          let ISBN = bookData.ISBN
          
          
        // const {title , excerpt , ISBN} = bookData ;
        if(bookData.title){
          if(!validator.isValid(title)){
            return  res.status(400).send({status:false , Message:"please enter Valid Title to update"})
              
          }

              let checkTitle = await bookModel.findOne({title:title , isDeletd:false})

        if (checkTitle) {
            return  res.status(400).send("there is already book present with this Title");
             
        }
     }
     if(bookData.excerpt){
          if( !validator.isValid(bookData.excerpt)){
            return res.status(400).send({status:false , Message:"please enter Valid excerpt to update"})
           
        }
    }
        // if( !validator.isValid(releaseDate)){
        //     res.status(400).send({status:false , Message:"please enter Valid releaseDate to update"})
       // }
        if(ISBN){
        if( !validator.isValid(ISBN)){
            return  res.status(400).send({status:false , Message:"please enter Valid ISBN to update"})
            
        }

        let ISBNN = /^(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$/.test(ISBN)

        if( ISBNN = true){
            return   res.status(400).send({status:false , Message:"please enter Valid ISBN to update"})
            
        }


        let checkISBN = await bookModel.findOne({ISBN:ISBN})

        if (checkISBN) {
            return  res.status(400).send({status:false , message:"there is already book present with this ISBN  number"});
             
        }
    }

          if  (bookData)
               bookData["releasedAt"] = new Date();

        let updatedBook = await bookModel.findOneAndUpdate({ _id: bookId }, bookData, { new: true });
        return res.status(201).send({ status: true, data: updatedBook });
        
    }
    catch (err) {
        console.log("this is the error:", err.message)
       return res.status(500).send({ msg: "error", error: err.message })
    }
 }
                         
module.exports={createBook , updateBook}
//module.exports.updateBook = updateBook