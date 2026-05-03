const { Query } = require("mongoose");
const task=require("../models/task");
const user=require("../models/user");
const { gettask, creattask,buildfilter,buildpagination,buildsort,titlevalidation, findtask,update,deletetask } = require("../services/taskservices");

exports.addtask=async(req,res,next)=>{
    try{
        
       const result=await creattask(req.user._id,req.body);
       res.status(200).json(result);
       
    }catch(error){
       next(error);
    }
};

exports.gettask=async(req,res,next)=>{
    try{
        const result=await gettask(req.user._id,req.query);
        res.status(200).json(result);
       
    }catch(error){
        next(error);
    }
};
exports.gettaskbyid=async(req,res,next)=>{
    try{
        const result=await findtask(req.user._id,req.params);
        res.status(200).json(result);
    }catch(error){
       next(error);
    }
};
exports.updatetask=async(req,res,next)=>{
    try{
        const result=await update(req.user._id,req.params,req.body);
        res.status(200).json(result);
        

    }catch(error){
       next(error);    
    }
};
exports.deletetask=async(req,res,next)=>{
    try{
        const result=await deletetask(req.user._id,req.params);
        res.status(200).json({message:"task deleted succesfully",
            title:result.title
        });

    }catch(error){
       next(error);
    }
};