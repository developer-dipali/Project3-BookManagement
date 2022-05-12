const express=require('express');
const router = express.Router();
const UserController = require("../controller/userController");
const bookController = require("../controller/bookController")
const mw =require("../validator/middleware")


router.post("/register",UserController.createUser)
router.post("/logIn",UserController.loginUser)
router.post("/books",bookController.createBook)
router.get("/books",mw.authorization,bookController.getBooks)
router.get("/books/:bookId",bookController.getbookbyId)
router.put("/books/:bookId",mw.authorization,bookController.updateBook)
router.delete("/books/:bookId",mw.authorization,bookController.deletedBook)
module.exports = router;
