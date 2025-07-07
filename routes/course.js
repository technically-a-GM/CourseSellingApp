const express = require('express');
const CourseRouter  = express.Router();
const {PurchaseModel,CourseModel} = require('../db');
const {authentication} = require('../middlewares/user');


CourseRouter.post("/purchase",authentication,async function (req,res){
    const userId = req.userId;
    const courseId = req.body.courseId;
     await PurchaseModel.create({
        UserId : userId,
        CourseId : courseId
     })

res.json({
    mess :"you have bought the course"
})
})

CourseRouter.get("/preview",async function(req,res){
    const courses = await CourseModel.find({});
    res.json({
    Courses : courses
})
})


module.exports = {
    CourseRouter
}