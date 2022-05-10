const mongoose = require('mongoose')
const userModel = require('../model/userModel')
const validator = require("../validator/validator.js")
const jwt = require("jsonwebtoken")



const createUser = async function (req, res) {
  try{

  let nameRegEx = /^[A-z]*$|^[A-z]+\s[A-z]*$/
  let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let mobileRegEx = /^(\+\d{1,3}[- ]?)?\d{10}$/

  let data = req.body;
  if (!validator.isValidRequestBody(data))
    return res.status(400).send({ status: false, msg: "Please enter some data to create Intern Details." })

  //====title validation===/
  if (!validator.isValid(data.title))
    return res.status(400).send({ status: false, msg: "Please enter your Title." })
  if (!validator.isValidTitle(data.title))
    return res.status(400).send({ status: false, msg: "Please enter valid Title." })

  //====name vaidation====//
  if (!validator.isValid(data.name))
    return res.status(400).send({ status: false, msg: "Please enter your Name." })

  if (!data.name.trim().match(nameRegEx))
    return res.status(400).send({ status: false, msg: "Enter a Valid Name." })


  //======phone validation======//
  if (!validator.isValid(data.phone))
    return res.status(400).send({ status: false, msg: "Please enter your Mobile." })

  if (!data.phone.trim().match(mobileRegEx))
    return res.status(400).send({ status: false, msg: "Enter a Valid mobile." })

  let phone = await userModel.findOne({ phone: data.phone, isDeleted: false })
  if (phone)
    return res.status(400).send({ status: false, msg: "Phone Number already register" })

  //======email validation========//

  if (!validator.isValid(data.email))
    return res.status(400).send({ status: false, msg: "Please enter your EmailId" })

  if (!data.email.trim().match(emailRegEx))
    return res.status(400).send({ status: false, msg: "Enter a Valid EmailId." })

  let email = await userModel.findOne({ email: data.email, isDeleted: false })
  if (email)
    return res.status(400).send({ status: false, msg: "emailId already register" })

  //======Password Validation=======//
  if (!validator.isValid(data.password))
    return res.status(400).send({ status: false, msg: "Please enter your Password" })


  //======address vaidation========//
  if (!validator.isValid(data.address.street))
    return res.status(400).send({ status: false, msg: "Please enter your street Name" })

  if (!validator.isValid(data.address.city))
    return res.status(400).send({ status: false, msg: "Please enter your city Name" })

  if (!validator.isValid(data.address.pincode))
    return res.status(400).send({ status: false, msg: "Please enter your pincode Name" })

  let saveUser = await userModel.create(data)
  res.status(201).send({ status: true, msg: "User created successfully", data: saveUser })
}catch (err) {
  res.status(500).send({ data: err.message })
}}
//========================= logIn===============================//

const loginUser = async function (req, res) {
  try {

    let data = req.body
    let email = data.email
    if (!email) return res.status(400).send({ msg: "email required" })
    let password = data.password
    if (!password) return res.status(400).send({ msg: "password required" })
    let login = await userModel.findOne({ email: email, password: password, isDeleted: false })
    if (!login) return res.status(400).send({ msg: "email or password does not match" })

  var token = jwt.sign({
        userId:login._id,
        project:"book_management",
        organization:"functionUp"
      }, "functionUp_uranium",{expiresIn:"2m"});
res.setHeader("my-api-key", token )
res.status(200).send({ status: true, msg: "login successfull", email, password, data: token })
}
catch (err) {
  res.status(500).send({ data: err.message })
}
}


module.exports = { createUser, loginUser }





// title: { type: String, required: true, enum: ['Mr', 'Mrs', 'Miss'] },
// name: { type: String, required: true },
// phone: { type: String, required: true, unique: true },
// email: { type: String, required: true, unique: true },
// password: { type: String, required: true, minlength: 8, maxlength: 15 },
// address: {
//     street: { type: String },
//     city: { type: String },
//     pincode: { type: String }
// }
