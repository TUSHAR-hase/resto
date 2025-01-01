const { default: mongoose } = require("mongoose");

const signupModal= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    conpassword:String,
    contect:Number
    ,address:String
})
export const signupSchema=mongoose.models.collections||mongoose.model("collections",signupModal);