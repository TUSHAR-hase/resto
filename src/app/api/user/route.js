import mongoose from "mongoose";
import { connectionstr } from "../../lib/db";
import { userSchema } from "../../lib/user";
import { NextResponse } from "next/server";

export async function POST(req){
   try {
      const data=await req.json();
      let success=false
      await mongoose.connect(connectionstr,{useNewUrlParser:true})
      const info= new userSchema(data)
      const result= await info.save();
      if(result){
       success=true;
      }
      return NextResponse.json({result,success})
   } catch (error) {
      console.log(error);
   }
}
export async function GET(req){
   let success=false
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const result= await userSchema .find()
   
    if(result){
     success=true;
    }
    return NextResponse.json({result,success})
 }