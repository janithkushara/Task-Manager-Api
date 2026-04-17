const task=require("../models/task");
const user=require("../models/user");

exports.addtask=async(req,res)=>{
    try{
        const{title}=req.body;
        if(!title?.trim()){
            return res.status(400).json({message:"field must be filled"});
        }
        const taskexist=await task.findone({taskname,user:req.user._id});
        
        if(taskexist){
            return res.status(400).json({message:"task already exist"});
        }
        if(typeof title !== "string"){
            return res.status(400).json({message:"title shoud be in proper format"});
        }
        const newtask=await task.create({
            title,
            completed,
            user:req.user._id
        });
        res.status(201).json(newtask);

    }catch(error){
        res.status(500).json({message:error.message});
    }
}