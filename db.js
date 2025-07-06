const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
email : {type : String , unique : true},
password : String,
firstName : String,
lastName : String
})

const AdminSchema = new Schema({
email : {type : String , unique : true},
password : String,
firstName : String,
lastName : String
})


const CourseSchema = new Schema({
title : String,
description : String,
price : Number,
imageUrl : String,
CreatorId : ObjectId
})


const PurchaseSchema = new Schema({
UserId  : ObjectId,
CourseId : ObjectId
})

const UserModel = mongoose.model("user",UserSchema);
const AdminModel = mongoose.model("admin",AdminSchema);
const CourseModel = mongoose.model("course",CourseSchema);
const PurchaseModel = mongoose.model("purchase",PurchaseSchema);

module.exports = {
     UserModel,
     CourseModel,
     AdminModel,
     PurchaseModel
}