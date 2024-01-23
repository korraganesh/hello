const mongoose = require("mongoose");

const schema  = mongoose.Schema;

const RegistrationSchema = new schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        
        name:{
            type: String,
            required: true
        },
       
        password:{
            type:String,
            resquired:true
        }


    }
)

const User = mongoose.model("User", RegistrationSchema);
module.exports = {User};