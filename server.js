const express=require("express");
const dotenv=require("dotenv");
const connectdb=require("./config/db");
const cors=require("cors");
const morgan=require("morgan");
 
dotenv.config({path:".env"});
connectdb();

const app=express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/auth",require("./routes/authroutes"));
app.use("/api/task/",require("./routes/taskroute"));


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
