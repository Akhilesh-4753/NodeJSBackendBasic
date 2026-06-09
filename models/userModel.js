const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    email:{
        type:String,
        required:true,
        unique:true
    }
})

const User = mongoose.model("UserData",userSchema);
module.exports = User;