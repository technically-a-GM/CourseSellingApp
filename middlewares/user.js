const {z} = require("zod");
const jwt  = require("jsonwebtoken");


const {JWT_USER_PASSWORD} = require("../config");

function validation(req,res,next){
    const validateObject = z.object({
    email : z.string().z.min(5).z.max(40).z.email(),
    password : z.string().z.min(5).z.max(40),
    firstName : z.string().z.min(3).z.max(40),
    lastName : z.string().z.min(3).z.max(40)
    })

    const parsed = validateObject.safeParse(req.body);

    if(!parsed.success){
        res.status(403).json({
          error : parsed.error
        })
        return;
    }
    next();
}


function authentication(req,res,next){
    try{
    const token  = req.headers.token;
    const decoded = jwt.verify(token,JWT_USER_PASSWORD);
    //.verify function can throw exception unlike decode function so we need to take care of that thats why we are using try catch
    req.userId = decoded.userId;
    next();
    }
    catch{e}{
        res.status(403).json({
            mess : "Authentication failed"
        })
    }
}