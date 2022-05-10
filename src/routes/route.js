const express=require('express');
const router = express.Router();
const UserController = require("../controller/userController");
// const blogsController = require("../controller/blogsController")



router.post("/register",UserController.createUser)
router.post("/logIn",UserController.loginUser)

module.exports = router;