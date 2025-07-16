const express = require("express");
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

const uploadproducts = mongoose.model("productdetails",userschema);
module.exports = uploadproducts;