const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {JWT_ADMIN_PASSWORD} = require("../config");
const AdminRouter = express.Router();
const {AdminModel} = require("../db");
const {authentication,validation} = require("../middlewares/admin") ;
AdminRouter.post("/signup",validation,async function(req,res){
    const {email,password,firstName,lastName } = req.body;
    const encryptedPass = await bcrypt.hash(password,5);
   const check =  await AdminModel.create({
        email,
        password : encryptedPass,
        firstName,
        lastName
    })

res.json({
    mess :"you are signed up"
})
})

AdminRouter.post("/signin",async function(req,res){
    const {email,password} = req.body;
     let foundUser = AdminModel.findOne({
        email
     })
     if(foundUser){
      let check =  await bcrypt.compare(password,foundUser.password);
      if(check){
        const token  = jwt.sign({
            adminId : foundUser._id
        },JWT_ADMIN_PASSWORD);
        res.json({
            token : token
        })
      }
      else
      {
        res.status(404).json({
            mess : "Wrong password"
        })
        return
      }
     }
     else{
    res.status(403).json({
    mess :"admin not found"
})
     }
})

AdminRouter.post("/courses",function(req,res){
    res.json({
    mess :"you are signed up"
})
})

AdminRouter.post("/courses/bulk",function(req,res){
    res.json({
    mess :"you are signed up"
})
})


module.exports = {
    AdminRouter
}