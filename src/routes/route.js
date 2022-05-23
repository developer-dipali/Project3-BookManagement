const express=require('express');
const router = express.Router();
const UserController = require("../controller/userController");
const bookController = require("../controller/bookController")
const reviewController = require("../controller/reviewController")
const mw =require("../validator/middleware")
const aws= require("aws-sdk")


router.post("/register",UserController.createUser)

router.post("/logIn",UserController.loginUser)

router.post("/books",bookController.createBook)

router.get("/books",mw.authentication,bookController.getBooks)

router.get("/books/:bookId",mw.authentication,mw.authorization,bookController.getbookbyId)

router.put("/books/:bookId",mw.authentication,mw.authorization,bookController.updateBook)

router.delete("/delete/:bookId",mw.authentication,mw.authorization,bookController.deletedBook)

router.post("/books/:bookId/review",reviewController.createReview)

router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)

//router.post("/write-file-aws",bookController.createBook)

module.exports = router;
