import mongoose from "mongoose";
import { connectionstr } from "../../lib/db";
import { orderSchema } from "../../lib/orderModal";
import { NextResponse } from "next/server";
import { signupSchema } from "../../lib/signupModal";
import { foodsSchema } from "../../lib/foods";

export async function POST(req) {
   const data = await req.json();
   let success = false
   await mongoose.connect(connectionstr, { useNewUrlParser: true })
   const info = new orderSchema(data)
   const result = await info.save();
   if (result) {
      success = true
   }
   return NextResponse.json({ success, result })
}
export async function GET(req) {
   let id = req.nextUrl.searchParams.get('id')
   console.log(id)
   let success = false
   let result = id;
   await mongoose.connect(connectionstr, { useNewUrlParser: true });
   result = await orderSchema.find({ user_id: id })
  
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