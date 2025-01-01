const { default: mongoose } = require("mongoose");

const deliverypartnerModal= new mongoose.Schema({
    name:String,
   email:String,
    password:String,
   
    contect:Number
    ,city:String
})
export const deliverypartnerSchema=mongoose.models.deliverymans||mongoose.model("deliverymans",deliverypartnerModal);