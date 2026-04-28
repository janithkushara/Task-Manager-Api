const { Query } = require("mongoose");
const task=require("../models/task");
const user = require("../models/user");

exports.buildfilter=(user,query)=>{
        const filter={user};
        if(query.completed!==undefined){
            filter.completed=query.completed==="true";
        }
         if(query.search && query.search.trim()!==""){
            filter.title={
                $regex:query.search,
                $options:"i"
            }
        }
        return filter;
};
exports.buildsort=(query)=>{
         let sortOption = { createdAt: -1 };
                if(query.sort && query.sort.trim()!== ""){
                    const[field,order]=query.sort.split("_");
                      sortOption = {
                     [field]: order === "desc" ? -1 : 1
                     };
                }
        return sortOption;
};
exports.buildpagination=(query)=>{
                const page= +query.page || 1;
                const limit= +query.limit || 5;
                const skip= (page-1)*limit;
                 return {limit,skip,page};
};
exports.gettask=async(user,query)=>{
        const filter=this.buildfilter(user,query);
        const sortOption=this.buildsort(query);
        const{limit,skip,page}=this.buildpagination(query);
         const count=await task.countDocuments(filter);
                 if(skip>=count){
                    throw new Error("page not found");
                 }
        const findtask=await task.find(filter).sort(sortOption).skip(skip).limit(limit); 
          
        return({
            "total":count,
            "page":page,
            "limit":limit,
            "data":findtask
        });

};
exports.titlevalidation=(body)=>{
            const{title}=body;
                   if(!title || typeof title !== "string"){
                       throw new Error("title shoud  need and should be in proper format");
                   }
                   if(!title?.trim()){
                       throw new Error("field must be filled");
                   }
                   return title.trim();
}
exports.creattask=async(user,body)=>{
        const title=this.titlevalidation(body);
        const taskexist=await task.findOne({title,user:user});
        
        if(taskexist){
             throw new Error("task already exist");
        }
        
        const newtask=await task.create({
            title,
            completed:false,
            user:user
        });
        return({
         _id: newtask._id,
        title: newtask.title,
        completed: newtask.completed,
        user: newtask.user,
        createdAt: newtask.createdAt,
        updatedAt: newtask.updatedAt
         });

};
exports.findtask=async(user,params)=>{
           const {taskId}=params;
            const taskexist=await task.findOne({
            _id:taskId,
            user
        });
        if(!taskexist){
            throw new Error("task not found");
        }
        return taskexist;
};
exports.update=async(user,params,body)=>{
      const task=await this.findtask(user,params);
       const allowedfileds = ["title","completed"];
        
        allowedfileds.forEach((field) => {
            if(body[field]!==undefined){
            task[field]=body[field];
            }
        });
        await  task.save();
         return(task);      
};
exports.deletetask=async(user,params)=>{
    const task=await this.findtask(user,params);
    await task.deleteOne();
    return(task);

};



