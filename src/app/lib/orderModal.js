const { default: mongoose } = require("mongoose");

const orderModal=new mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    foodids:String,
    deliveryboy_id:mongoose.Schema.Types.ObjectId,
    resto_id:mongoose.Schema.Types.ObjectId,
    status:String,
      items: [{
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
        name: String,
        price: Number,
        quantity: Number
    }]
    ,amount:String
})
export const orderSchema=mongoose.models.orders||mongoose.model('orders',orderModal)