const express=require("express");
const {protect}=require("../middleware/authmiddleware");
const{
    signup,
    signin
}=require("../controllers/authcontroller");
const router=express.Router();
router.post("/register",signup);
router.post("/login",signin);


module.exports=router;