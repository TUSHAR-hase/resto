import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { connectionstr } from "../../../lib/db"
import { deliverypartnerSchema } from "../../../lib/deliverypartner"

export async function GET(req,resp){
    let city= resp.params.city
    let success=false;
await mongoose.connect(connectionstr,{useNewUrlParser:true})
let filter={city:{$regex:new RegExp(city,'i')}}
const result=await deliverypartnerSchema.find(filter)
    console.log(city)
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}