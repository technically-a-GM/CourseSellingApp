const express  = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {UserModel,PurchaseModel,AdminModel,CourseModel} = require("./db")
const app = express();

const {UserRouter} = require("./routes/user");
const {AdminRouter} = require("./routes/admin");
const {CourseRouter} = require("./routes/course");


app.use("/api/v1/user",UserRouter)
app.use("/api/v1/course",CourseRouter)
app.use("/api/v1/admin",AdminRouter)

async function main(){
   await mongoose.connect("mongodb+srv://abhinav13112005:YikjOIelZkqmfg1e@cluster0.4tb9uyf.mongodb.net/coursera");
app.listen(3000);
console.log("listening to port 3000")
}

main()