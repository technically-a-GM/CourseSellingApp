const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {JWT_ADMIN_PASSWORD} = require("../config");
const AdminRouter = express.Router();
const {AdminModel,CourseModel} = require("../db");
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
     let foundUser = await AdminModel.findOne({
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

AdminRouter.post("/courses",authentication,async function(req,res){
    const adminId = req.adminId;
    const {title,description,price,imageUrl} = req.body
    const course = await CourseModel.create({
        title,
        description,
        price,
        imageUrl,
        CreatorId : adminId
    })
    res.json({
    mess :"Course Created",
    CourseId : course._id
})
})

AdminRouter.put("/updatecourses",authentication,async function(req,res){
    const adminId = req.adminId;
   const {title,description,price,imageUrl,courseId} = req.body
      const course= await CourseModel.findOne({
         _id : courseId,
        CreatorId : adminId 
      })
      if(course){
       const course2 =await CourseModel.updateOne({
        _id : courseId,
        CreatorId : adminId    
       },
       {
        title,
        description,
        price,
        imageUrl,
       })
    res.json({
    mess :"Course Updated",
    CourseId : course._id
})
      }
      else
      {
        res.status(403).json({
            mess : "course does not exists"
        })
      }
})

AdminRouter.get("/courses/bulk",authentication,async function(req,res){
   const adminId = req.adminId;
   const courses = await CourseModel.find({
    CreatorId : adminId
   })
    res.json({
   courses : "below are your courses",
   courses
})
})


module.exports = {
    AdminRouter
}