const User = require("../Shema/Registrationschema")

const getUser = async(req,res)=>{
    let response;
    try{
        const userId = req.body.userId;
        const user = await User.findById(userId, {name:1,email:1})
        
        if(!user){
            response = {status:"error", message:"no user found", data:{}}
            res.send(response)
        }
        else{
            response = {status:"success",message:"data fetched successfully",  data:{}}
            res.send(response)
        }
    }catch(error){
        console.log('Error in getting the user details', error);
        response={status:'error',message:"Internal server error",data:{}}
        res.status(500).send(response)
    }
}

module.exports={getUser}