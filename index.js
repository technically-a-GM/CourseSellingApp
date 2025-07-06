const express  = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {UserModel,PurchaseModel,AdminModel,CourseModel} = require("./db")
const app = express();
app.use(express.json());
const {UserRouter} = require("./routes/user");
const {AdminRouter} = require("./routes/admin");
const {CourseRouter} = require("./routes/course");


app.use("/api/v1/user",UserRouter)
app.use("/api/v1/course",CourseRouter)
app.use("/api/v1/admin",AdminRouter)

async function main(){
   await mongoose.connect(process.env.Mongo_Url);
app.listen(3000);
console.log("listening to port 3000")
}

main()