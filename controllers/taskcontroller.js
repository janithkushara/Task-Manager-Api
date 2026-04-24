const { Query } = require("mongoose");
const task=require("../models/task");
const user=require("../models/user");

exports.addtask=async(req,res)=>{
    try{
        const{title}=req.body;
        if(typeof title !== "string"){
            return res.status(400).json({message:"title shoud be in proper format"});
        }
        if(!title?.trim()){
            return res.status(400).json({message:"field must be filled"});
        }
        const taskexist=await task.findOne({title,user:req.user._id});
        
        if(taskexist){
            return res.status(400).json({message:"task already exist"});
        }
        
        const newtask=await task.create({
            title,
            completed:false,
            user:req.user._id
        });
        res.status(201).json({
         _id: newtask._id,
        title: newtask.title,
        completed: newtask.completed,
        user: newtask.user,
        createdAt: newtask.createdAt,
        updatedAt: newtask.updatedAt
         });

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.gettask=async(req,res)=>{
    try{
        
        const filter={user:req.user._id};
        if(req.query.completed!==""){
             filter.completed=req.query.completed === "true";
        }
        if(req.query.search && req.query.search.trim()!==""){
            filter.title={
                $regex:req.query.search,
                $options:"i"
            }
        }
        let sortOption = { createdAt: -1 };
        if(req.query.sort && req.query.sort.trim()!== ""){
            const[field,order]=req.query.sort.split("_");
             const sortOption = {
             [field]: order === "desc" ? -1 : 1
             };
        }

        const page= +req.query.page || 1;
        const limit= +req.query.limit || 5;
        const skip= (page-1)*limit;
        const count=await task.countDocuments(filter);
         if(skip>=count){
            return res.status(404).json({message:"page not found"});
        }
         const findtask=await task.find(filter).sort(sortOption).skip(skip).limit(limit); 
       
        res.status(200).json({
            "total":count,
            "page":page,
            "limit":limit,
            "data":findtask
        });
       
    }catch(error){
        res.status(500).json({
            message:"failed to fetch task",
            error:error.message
        });
    }
};
exports.gettaskbyid=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const onetask=await task.findOne({
            _id:taskId,
            user:req.user._id
        });
      //  console.log("PARAM ID:", taskId);
       // console.log("TOKEN USER:", req.user._id);
        if(!onetask){
            return res.status(404).json({message:"task not found"});
        }
        res.status(200).json(onetask);
    }catch(error){
        return res.status(500).json({
            message:"failed to fetched task",
            error:error.message
        });
    }
};
exports.updatetask=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const taskexist=await task.findOne({
            _id:taskId,
            user:req.user._id
        });
        if(!taskexist){
            return res.status(404).json({ message:"task not found"})
        }
        const allowedfileds = ["title","completed"];
        
        allowedfileds.forEach((field) => {
            if(taskexist[field]!==undefined){
            taskexist[field]=req.body[field];
            }
        });
        await taskexist.save();
        res.status(200).json(taskexist);
        

    }catch(error){
        res.status(500).json({
            message:"failed to fetched task",
            error:error.message
        });     
    }
};
exports.deletetask=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const DeletedTask=await task.findOneAndDelete({
            _id:taskId,
            user:req.user._id
        });
       // console.log("PARAM ID:", taskId);
       // console.log("TOKEN USER:", req.user._id);
        if(!DeletedTask){
            return res.status(404).json({
                message:"task not exist"
            });
        }
        res.status(200).json({message:"task deleted succesfully",
            title:DeletedTask.title
        });

    }catch(error){
        res.status(500).json({
            message:"failed to fetch task",
            error:error.message
        });
    }
};