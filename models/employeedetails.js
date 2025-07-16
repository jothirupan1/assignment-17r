const express= require("express");
const mongoose =require("mongoose");

const userschema = new mongoose.Schema(
    {
      
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true
        },
        role:{
            type:String,
            require:true
        }
    }
)

const upload = mongoose.model("employeedetails",userschema);
module.exports= upload;