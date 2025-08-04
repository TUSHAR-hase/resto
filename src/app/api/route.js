import mongoose from "mongoose";
import { NextResponse } from "next/server";


import { connectionstr } from "../lib/db";
import { signupSchema } from "../lib/signupModal";

export async function GET(){
    await mongoose.connect(connectionstr,{useNewUrlParser:true})

// console.log(data);
    return NextResponse.json({result:true})
}
export async function POST(req){
  try {
      let data=await req.json();
      let info;
      let success=false;
      await mongoose.connect(connectionstr,{useNewUrlParser:true});
      if(data.login){
          info=await signupSchema.findOne({email:data.email,password:data.password});
          if(info){
              success=true;
          }
      }else{
          const result= new signupSchema(data);
          info= await result.save();
          if(info){
              success=true;
          }
         
      }
     
  
      return NextResponse.json({ info,success})
  } catch (error) {
     console.error("MongoDB POST error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 }); 
  }
}