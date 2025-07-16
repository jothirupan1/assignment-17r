const express= require("express");

const app =express();
app.use(express.json());
const mongoose =require("mongoose");
const jwt =require("jsonwebtoken");
const bcrypt =require("bcrypt");
const dbconnection = require("./config/dbconnection");
const Products = require('./models/productdetails');
const Users = require("./models/employeedetails");
const authmiddleware = require('./middleware/authmiddleware')
const jwt_key = "jothirupan"
const port = process.env.PORT || 3001;

const cors =require("cors")
app.use(cors());

app.post("/Products",authmiddleware(["admin"]),async(req,res)=>{
    try{
        const createProducts = await Products.create(req.body);
        res.status(201).json({Message:"created"})
    }catch(err){
        console.error(err);
        res.status(400).json({message:"cannot add"})
    }
});

app.get("/Products",authmiddleware(["admin","user"]),async (req,res)=>{
    try{
        const getproduct = await Products.find();
        res.status(200).json({ message: "you can view the products", products: getproduct });

    }
    catch(err){
        console.error(err);
        res.status(404).json({message:"you cannot get the products"})
    }
})

app.put("/Products/:id",authmiddleware(["admin"]) ,async (req,res)=>{
    try{
        const editProduct = await Products.findByIdAndUpdate(req.params.id ,req.body ,{new:true})
        if(!editProduct){
            return res.status(400).json({message:"there is not product in that id"});
        }
        res.status(200).json({message:"Product has been updated bro"});
    }
    catch(err){
        console.error(err);
        res.status(400).json({message:"you cannot update this product"})
    }
})

app.delete("/Products/:id",authmiddleware(["admin"]),async(req,res)=>{
   try{
     const deleteproducts = await Products.findByIdAndDelete(req.params.id);
    if(!deleteproducts){
        return res.status(404).json({message:"there is not products in that id"});
    }
    res.status(200).json({message:"the Product details is deleted"})
   }
   catch(err){
    console.error(err);
    res.status(400).json({message:"you cannot update this product"})
   }

})

app.post("/auth/register",async(req,res)=>{
    const {email,password,role} = req.body;
try{
    const emailcheck = await Users.findOne({email});
    if (emailcheck){
        return res.status(400).json({message:"this email is aldready registered"})
    }

    const hassedpassword = await bcrypt.hash(password,10);
    const detail =new Users({email,password :hassedpassword,role});
    await detail.save();
    res.status(200).json({message:"you have registered the message"})
}
catch(err){
    console.error(err)
}
})


app.post('/auth/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const userLogin = await Users.findOne({email});
        if(!userLogin){
            return res.status(400).json({message:"invalid email"}) ;
        }
        const checkPassword = await bcrypt.compare(password , userLogin.password);
        if(!checkPassword){
            return res.status(400).json({message:"invalid password"});
        }

        const token = jwt.sign({userId:userLogin.id
            , role:userLogin.role }
            ,jwt_key,{expiresIn:"1d"})

        res.status(200).json({message:"you have logged in successfully ",token: token})
    }

    catch(err){
        console.error(err);
    }
})

app.listen(port, () => {
    dbconnection();
    console.log(`server is on air at port ${port}`);
});