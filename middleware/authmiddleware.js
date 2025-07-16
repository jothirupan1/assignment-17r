const jwt=require("jsonwebtoken");

const authmiddleware=(alloweduser=[])=>{
return(req,res,next)=>{
    const authheader = req.headers.authorization;
    if(!authheader || !authheader.startsWith("Bearer ")){
        return res.status(400).json({message:"this is invalid token bro"})
    }
    const token =authheader.split(" ")[1];
    try{
        const decode =jwt.verify(token,"jothirupan");
        const userrole=decode.role;

        if(alloweduser.includes(userrole)){
            return next();
        }
        return res.status(403).json({message:"this is bad request"})
    }
    catch(err){
        console.error(err)
         return res.status(401).json({ message: "Token verification failed" });
    }

   
}
}

module.exports=authmiddleware;

