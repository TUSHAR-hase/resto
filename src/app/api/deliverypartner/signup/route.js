import mongoose from "mongoose";
import { connectionstr } from "../../../lib/db";
import { deliverypartnerSchema } from "../../../lib/deliverypartner";
import { NextResponse } from "next/server";

export async function POST(req){
    const data=await req.json();
    let success=false
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const info=new deliverypartnerSchema(data);
    const result=await info.save();
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}