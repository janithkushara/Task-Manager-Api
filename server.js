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
const authRoutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");
app.use("/api/auth",authRoutes);
app.use("/api/task",taskRoutes);


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
