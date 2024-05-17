const express = require("express");
const cors=require("cors");
const dotenv=require('dotenv');
const errorMiddleware=require("./middlewares/error-middleware");
const path=require('path');
dotenv.config();

const app=express();
const authRouter=require("./router/auth-router");
const contactRouter=require("./router/contact-router");
const serviceRoute=require("./router/service-router");
const adminRoute=require("./router/admin-router");
const connectDb=require("./utils/db");

// let's tackle cors
 const corsOptions={
    origin:"http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
 };

 app.use(cors(corsOptions));


//middleware 
app.use(express.json());
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client/dist/index.html'));
})

app.use("/api/auth",authRouter);
app.use("/api/form",contactRouter);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);

// app.get("/",(req,res)=>{
//      res.status(200).send("Welcome to world best mern by thapa techincal");
// });

// app.get("/register",(req,res)=>{
//   res.status(200).send("Welcome to register");
// });


app.use(errorMiddleware);

const PORT=5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    })});
;
