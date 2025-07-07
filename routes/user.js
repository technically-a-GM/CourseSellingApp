const express = require('express');
const UserRouter  = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {JWT_USER_PASSWORD} = require("../config")
const {UserModel,PurchaseModel, CourseModel} = require("../db");
const {authentication,validation} = require("../middlewares/user") ;
UserRouter.post("/signup",validation,async function(req,res){
 const {email,password,firstName,lastName } = req.body;
 try{
    const encryptedPass = await bcrypt.hash(password,5);
   const check =  await UserModel.create({
        email,
        password : encryptedPass,
        firstName,
        lastName
    })

res.json({
    mess :"you are signed up"
})
 }
 catch(e){
    res.status(403).json({
        mess : "Duplicate User"
    })
 }
})

UserRouter.post("/signin",async function(req,res){
     const {email,password} = req.body;
     let foundUser = await UserModel.findOne({
        email
     })
     if(foundUser){
      let check =  await bcrypt.compare(password,foundUser.password);
      if(check){
        const token  = jwt.sign({
            userId : foundUser._id
        },JWT_USER_PASSWORD);
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
    mess :"user not found"
})
     }
})

UserRouter.post("/courses",authentication,async function(req,res){
    const userId = req.userId;
    const purchases = await PurchaseModel.find({
        UserId : userId
    })
    const courses = []
    for(const it of purchases){
        const course = await CourseModel.findOne({
            _id : it.CourseId
        })
        courses.push(course);
    }
    res.json({
    courses : courses
})
})

UserRouter.post("/courses/bulk",function(req,res){
    res.json({
    mess :"you are signed up"
})
})


module.exports = {
    UserRouter
}