const user=require("../models/user");
const generatetoken=require("../utils/genratetikens");
const protect=require("../middleware/authmiddleware");
const bcrypt=require("bcryptjs");


exports.signup=async(req,res)=>{
    try{
        const{firstname,lastname,email,password,role}=req.body;

        if(!firstname || !lastname || !email|| !password || !role){
            return res.status(400).json({message:"all fields must be filled"});
        }
        const userexist=await user.findOne({email});
        if(userexist){
            return res.status(400).json({message:"user already exists"});
        }
        const hashedpassword=await bcrypt.hash(password,10);
        
        const newuser=await user.create({
            firstname,
            lastname,
            email,
            role,
            password:hashedpassword
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
}