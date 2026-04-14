const express=require("express");
const {protect}=require("../middleware/authmiddleware");
const{
    signup,
    signin,
    refreshToken
}=require("../controllers/authcontroller");
const router=express.Router();
router.post("/register",signup);
router.post("/login",signin);
router.post("/refresh-token",refreshToken);


module.exports=router;