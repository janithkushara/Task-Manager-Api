const express=require("express");
const dotenv=require("dotenv");
const connectdb=require("./config/db");
const cors=require("cors");
 
dotenv.config({path:".env"});
connectdb();

const app=express();
app.use(cors());
app.use(express.json());


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
