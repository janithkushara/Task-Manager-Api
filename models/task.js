const mongoose=require("mongoose");

const Task=mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},
 {
    timestamps:true
 }
);
module.exports=mongoose.model("task",Task);