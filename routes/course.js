const express = require('express');
const CourseRouter  = express.Router();

CourseRouter.post("/purchases",function(req,res){
res.json({
    mess :"you are signed up"
})
})

CourseRouter.post("/preview",function(req,res){
    res.json({
    mess :"you are signed up"
})
})


module.exports = {
    CourseRouter
}