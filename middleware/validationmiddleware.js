const task=require("../models/task");
const user=require("../models/user");

exports.validatetask=async(req,res,next)=>{
    const{title}=req.body;
    if(title!=undefined){
        if(typeof title !=="string"){
            return res.status(400).json({message:"title should be a String"});
        }
        if(!title.trim()){
            return res.status(404).json({message:"title can not be ampty"});
        }
        req.body.title=title.trim();
    }
    next();
};
exports.validateUpdateTask = (req, res, next) => {
    const { title, completed } = req.body;


    if (title !== undefined) {
        if (typeof title !== "string") {
            return res.status(400).json({
                message: "Title must be a string"
            });
        }

        if (!title.trim()) {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }

        req.body.title = title.trim();
    }

    
    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be a boolean"
            });
        }
    }

    next();
};