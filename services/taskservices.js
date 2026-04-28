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
                $regex:req.query.search,
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
        const filter=buildfilter(user,query);
        const sortOption=buildsort(query);
        const{limit,skip,page}=buildpagination(query);
         const count=await task.countDocuments(filter);
                 if(skip>=count){
                    throw new error("page not found");
                 }
        const findtask=await task.find(filter).sort(sortOption).skip(skip).limit(limit); 
          
        return({
            "total":count,
            "page":page,
            "limit":limit,
            "data":findtask
        });

}