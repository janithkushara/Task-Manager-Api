const user=require("../models/user");
const generatetoken=require("../utils/genratetikens");
const bcrypt=require("bcryptjs");
const genaraterefresh=require("../utils/generaterefreshtokens");
const jwt=require("jsonwebtoken");

exports.signup=async(req,res)=>{
    try{
        let{firstname,lastname,email,password}=req.body;

        if(!firstname || !lastname || !email|| !password ){
            return res.status(400).json({message:"all fields must be filled"});
        }
        email=email.toLowerCase();
        const userexist=await user.findOne({email});
        if(userexist){
            return res.status(400).json({message:"user already exists"});
        }
        const hashedpassword=await bcrypt.hash(password,10);
        
        const newuser=await user.create({
            firstname,
            lastname,
            email,
            password:hashedpassword,
            role:"user"
        });
        res.status(201).json({
            id:newuser._id,
            firstname:newuser.firstname,
            lastname:newuser.lastname,
            email:newuser.email,
            role:newuser.role,
            token:generatetoken(newuser._id)
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
exports.signin=async(req,res)=>{
       try{
        let{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"all fields should filed"});
        }
        email=email.toLowerCase();
        const finduser=await user.findOne({email});
        if(!finduser){
            return res.status(400).json({message:"invalid credentials"});
        }
        const ismatch=await bcrypt.compare(password,finduser.password);
        if(!ismatch){
            return res.status(400).json({message:"invalid credentials"});
        }
        const accesstoken=generatetoken(finduser._id);
        const refreshToken=genaraterefresh(finduser._id);

        finduser.refreshToken=refreshToken;
        await finduser.save();
        res.status(200).json({
            id:finduser._id,
            firstname:finduser.firstname,
            lastname:finduser.lastname,
            email:finduser.email,
            role:finduser.role,
            accesstoken,
            refreshToken

        });
       }catch(error){
         res.status(500).json({message:"serever error"});
       }
};
exports.refreshToken=async(req,res)=>{
    try{
    const{refreshToken}=req.body;
    if(!refreshToken){
        return res.status(401).json({message:"no refresh token"});
    }
    const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    const finduser=await user.findById(decoded.id);
    if(!finduser || finduser.refreshToken !==refreshToken){
        return res.status(403).json({message:"invalid refresh token"});
    }
    const newAccessToken=generatetoken(finduser._id);
   return res.json({
        accesstoken:newAccessToken
    });
  }catch(error){
          res.status(403).json({message:"invalid or expired refresh token"});
  }
};