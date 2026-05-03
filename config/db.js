const mongoose=require("mongoose");
const connectdb=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  }catch(error){
    console.error("mongodb connection fialed",error.message);
    process.exit(1);
  }
};
module.exports=connectdb;