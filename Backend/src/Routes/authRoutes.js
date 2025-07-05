const express=require('express')
const {userLogin,userRegister,userForgotPassowrd,verifyOTP,resetPassword,userDetails,updateUserInfo}= require("../Controllers/authControllers")
const authMiddleware = require("../../middlewares/authMiddleware");

const router=express.Router();

router.post('/login',userLogin);
router.post('/register',userRegister);
router.post('/forgotPass',userForgotPassowrd);
router.post('/otpVerify',verifyOTP);

router.get('/user/profile',authMiddleware,userDetails);

router.put("/reset-password", resetPassword);
router.put("/updateUserDetails",authMiddleware,updateUserInfo)

module.exports=router;
