import mongoose from "mongoose";
import { connectionstr } from "../../../lib/db";
import { userSchema } from "../../../lib/user";
import { NextResponse } from "next/server";

export async function POST(req){
    let success=false;
        const data=await req.json();
        await mongoose.connect(connectionstr,{useNewUrlParser:true})
        const result= await userSchema.findOne({email:data.email,password:data.password})
        if(result){
            success=true
        }
         return NextResponse.json({result,success})
}
export async function GET(){
    let success=false
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const result= await userSchema.find();
    if(result){
        success=true
    }
    return NextResponse.json({success,result})
}