const { default: mongoose } = require("mongoose");

const orderModal=new mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    foodids:String,
    deliveryboy_id:mongoose.Schema.Types.ObjectId,
    resto_id:mongoose.Schema.Types.ObjectId,
    status:String
    ,amount:String
})
export const orderSchema=mongoose.models.orders||mongoose.model('orders',orderModal)