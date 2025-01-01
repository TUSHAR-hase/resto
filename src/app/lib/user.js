const { default: mongoose } = require("mongoose");

const userModal=new mongoose.Schema({
    name:String,
    email:String,
    contect:String,
    city:String,
    password:String,
    conpassword:String
})
export const userSchema=mongoose.models.users|| mongoose.model('users',userModal)