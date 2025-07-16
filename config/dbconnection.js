const mongoose = require("mongoose")

const dbconnection = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/employees")
        console.log("dataBase is connected bro");
    }catch(err){
        console.error(err,"database is not connected ");

    }
}
module.exports = dbconnection;