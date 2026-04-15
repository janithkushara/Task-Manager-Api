const express=require("express");
const {protect,isadmin}=require("../middleware/authmiddleware");
const{
    signup,
    signin,
    refreshToken,
    logout
}=require("../controllers/authcontroller");
const router=express.Router();
router.post("/register",signup);
router.post("/login",signin);
router.post("/refresh-token",refreshToken);
router.post("/logout",logout);
router.get("/admin",protect,isadmin,(req,res)=>{
    res.json({message:"welcome admin"});
});


module.exports=router;