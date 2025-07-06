const {z} = require("zod");
const jwt  = require("jsonwebtoken");


const {JWT_ADMIN_PASSWORD} = require("../config");

function validation(req,res,next){
    const validateObject = z.object({
    email : z.string().min(5).max(40).email(),
    password : z.string().min(5).max(40),
    firstName : z.string().min(3).max(40),
    lastName : z.string().min(3).max(40)
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
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD);
    //.verify function can throw exception unlike decode function so we need to take care of that thats why we are using try catch
    req.adminId = decoded.adminId;
    next();
    }
    catch{e}{
        res.status(403).json({
            mess : "Authentication failed"
        })
    }
}

module.exports = {
    authentication,
    validation
}