const express=require("express");

const User=require("../models/user-model");

const bcrypt=require("bcryptjs");

const home=async (req,res)=>{
  try{
    res.status(200).send("Welcome to world best mern series by thapa technical using contollers");
  }
  catch (error){
       console.log(error);
  }
};


const  register=async (req,res)=>{
  try{
  //  console.log(req.body);
    const {username,email,phone,password}=req.body;
const userExist= await User.findOne({email:email});
    if(userExist){
      return res.status(400).json({message:"email already exists"});
    }
// const saltRound=await bcrypt.genSalt(10);
// const hash_password=await bcrypt.hash(password,saltRound);


    const userCreated=await User.create({username,email,phone,password});

  

    console.log({username,email,phone,password});


   res.status(201).json({message:"registration is successfull",
   //userCreated,
  token:await userCreated.generateToken(),
  userId:userCreated._id.toString(),
     /*"Welcome to registration page using controllers"*/
  });
  }
  catch(error){
    res.status(500).json("internal server error");
  }
};

//user login logic.....
const login=async(req,res)=>{
      try{
         const {email,password}=req.body;

         const userExist=await User.findOne({email:email});

        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials"});
        }
   
        // const user=await bcrypt.compare(password,userExist.password);
        const user=await userExist.comparePassword(password);
        
        if(user){
          res.status(200).json({message:"login successfull",
          token:await userExist.generateToken(),
          userId:userExist._id.toString(),
  });
        }
        else{
           res.status(401).json({message:"Invalid email or password"});
        }

      }
      catch(error){
            next(error);
      }
}

//to send user data-user logic...
const user=async(req,res)=>{
      try{
        const userData=req.user;   
         console.log(userData);
         res.status(200).json({userData});
      }catch(error){
          console.log(`error from the user route ${error}`);
      }
}


module.exports={home,register,login,user};