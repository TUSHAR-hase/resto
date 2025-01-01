import mongoose from "mongoose";
import { connectionstr } from "../../../lib/db";
import { deliverypartnerSchema } from "../../../lib/deliverypartner";
import { NextResponse } from "next/server";

export async function POST(req){
    let success=false
    const data=await req.json();
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const result=await deliverypartnerSchema.findOne({contect:data.contect,password:data.password})
    if(result){
        success=true
    }
    return NextResponse.json({result,success})

}