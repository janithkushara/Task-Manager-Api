const express=require("express");
const{
    addtask,
    gettask,
    gettaskbyid,
    updatetask,
    deletetask
} = require("../controllers/taskcontroller");
const { protect } = require("../middleware/authmiddleware");

const router=express.Router();
router.post("/addtask",protect,addtask);
router.get("/gettask",protect,gettask);
router.get("/gettaskbyid/:taskId",protect,gettaskbyid);
router.put("/update/:id",protect,updatetask);
router.delete("/delete/:id",protect,deletetask);


module.exports=router;