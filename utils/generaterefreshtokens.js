const jwt=require("jsonwebtoken");

const genaraterefresh=(id)=>{
     return jwt.sign(
        {id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
     );
};

module.exports=genaraterefresh;