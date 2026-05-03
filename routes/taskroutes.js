const express=require("express");
const{
    addtask,
    gettask,
    gettaskbyid,
    updatetask,
    deletetask
} = require("../controllers/taskcontroller");
const { protect } = require("../middleware/authmiddleware");
const{validatetask,validateUpdateTask} =require("../middleware/validationmiddleware");

const router=express.Router();
router.post("/addtask",protect,validatetask,addtask);
router.get("/gettask",protect,gettask);
router.get("/gettaskbyid/:taskId",protect,gettaskbyid);
router.put("/update/:taskId",protect,validateUpdateTask,updatetask);
router.delete("/delete/:taskId",protect,deletetask);


module.exports=router;