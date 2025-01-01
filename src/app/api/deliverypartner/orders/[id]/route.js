import mongoose from "mongoose";


import { NextResponse } from "next/server";

import { connectionstr } from "../../../../lib/db";
import { orderSchema } from "../../../../lib/orderModal";
import { signupSchema } from "../../../../lib/signupModal";
export async function GET(req,resp) {
   let id = resp.params.id
   console.log(id)
   let success = false
   let result ;
   await mongoose.connect(connectionstr, { useNewUrlParser: true });
   result = await orderSchema.find({ deliveryboy_id: id })
  
   if (result) {
      let restodata = await Promise.all(
         result.map(async (item) => {
            let restoinfo = {}
            restoinfo.data = await signupSchema.findOne({ _id: item.resto_id })
            restoinfo.amount=item.amount;
            restoinfo.status=item.status
            return restoinfo
         })

      )
      result = restodata
      success=true
   }
  
   return NextResponse.json({ result,success })

}