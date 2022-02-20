const mongoose = require("mongoose");
const Validator = require("validator");

const userSchema = mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        minLength:3
    },
    user_email:{
        type:String,
        required:true,
        validate(value){
            if(!Validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },
    message:{
        type:String,
        required:true,
        minLength:3
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const User = mongoose.model("User",userSchema);
module.exports = User;
