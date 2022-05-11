const express=require('express');
const router = express.Router();
const UserController = require("../controller/userController");
const bookController = require("../controller/bookController")
const mw =require("../validator/middleware")


router.post("/register",UserController.createUser)
router.post("/logIn",UserController.loginUser)
router.post("/books",mw.authentication,bookController.createBook)
router.get("/books",mw.authentication,bookController.getBooks)
router.delete("/delete/:bookId",mw.authorization,bookController.deletedBook)
module.exports = router;