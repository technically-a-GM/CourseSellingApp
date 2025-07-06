const express = require('express');
const AdminRouter = express.Router();

AdminRouter.post("/signup",function(req,res){
res.json({
    mess :"you are signed up"
})
})

AdminRouter.post("/signin",function(req,res){
    res.json({
    mess :"you are signed up"
})
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