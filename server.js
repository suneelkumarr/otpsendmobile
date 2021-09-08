const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// init express app
const app = express()
const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("./config/config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./Error/error");

//routes
const authRoutes = require('./Route/auth.route')


// middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// log in development environment

if(NODE_ENV === "development"){
    const morgon = require('morgan')
    app.use(morgon("dev"));
}

//index route
app.get("/", (req,res)=>{
    res.status(200).json({
        type:"success",
        mes:"Server is up and running",
        data:null
    })
});

//routes middleware
app.use("/api/auth",authRoutes)

//page not found error handling middleware 

app.use('*',(req,res,next)=>{
    const error={
        status:404,
        mes:API_ENDPOINT_NOT_FOUND_ERR
    };
    next(error);
})

//global error handling middleware

app.use((err,req,res,next)=>{
    console.log(err)
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data= err.data || null;
    res.status(status).json({
        type:"error",
        message,
        data
    })
});

async function main(){
    try{
        await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,useNewUrlParser:true
        })
        console.log("database connected")

        app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

main()