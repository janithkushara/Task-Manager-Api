const jwt=require("jsonwebtoken");

const generatetoken=(id)=>{
    return jwt.sign(
        {id},
        process .env.JWT_SECRET,
        {expiresIn:"15m"}
    );
};

module.exports=generatetoken;

//practice this code for next projects remeber the flow


