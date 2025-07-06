const express = require('express');
const UserRouter  = express.Router();

UserRouter.post("/signup",function(req,res){
res.json({
    mess :"you are signed up"
})
})

UserRouter.post("/signin",function(req,res){
    res.json({
    mess :"you are signed up"
})
})

UserRouter.post("/courses",function(req,res){
    res.json({
    mess :"you are signed up"
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