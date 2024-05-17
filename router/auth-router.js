const express=require("express");
const router=express.Router();
// const {home,register}=require("../controllers/auth-controller")
// second method
const authcontrollers=require("../controllers/auth-controller");
const {signupSchema,loginSchema}=require("../validators/auth-validator");
const validate =require("../middlewares/validate-middleware");
const authMiddleware=require("../middlewares/auth-middleware");


 router.route("/").get(authcontrollers.home)// without controller karne par home ke jagah comment kiye gaye part ko dala jayega (req,res)=>{
//        res.status(200).send("Welcome to world best mern series by thapa technical using router");
// });


// another method to use router.....
// router.route("/register").get(authcontrollers.register)// same the above (req,res)=>{
//             res.status(200).send("Welcome to registration page");
// });

// use post.....
router.route("/register").post(validate(signupSchema),authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);

router.route("/user").get(authMiddleware,authcontrollers.user);


module.exports=router;
