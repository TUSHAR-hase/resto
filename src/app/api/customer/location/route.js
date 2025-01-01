import mongoose, { set } from "mongoose";
import { NextResponse } from "next/server";
import { connectionstr } from "../../../lib/db";
import { signupSchema } from "../../../lib/signupModal";

export async function GET (){
   await mongoose.connect(connectionstr,{useNewUrlParser:true});
   let result=await signupSchema.find();
 result=result.map((item)=>item?.address.charAt(0).toUpperCase()+item?.address.slice(1));
 result=[... new Set(result.map((item)=>item))]

    return NextResponse.json({success:true,result})
}