const express=require('express');
const router = express.Router();
const UserController = require("../controller/userController");
const bookController = require("../controller/bookController")



router.post("/register",UserController.createUser)
router.post("/logIn",UserController.loginUser)
router.post("/books",bookController.createBook)

module.exports = router;