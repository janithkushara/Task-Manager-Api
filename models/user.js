const mongoose=require("mongoose");

const usershema=new mongoose.Schema({

    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],
        default:"user"
    },
    refreshToken:{
        type:String,
        default:null
    }

},{
    timestamps:true
}
);
module.exports=mongoose.model("user",usershema);