import mongoose from "mongoose";
import { connectionstr } from "../../../../lib/db";
import { foodsSchema } from "../../../../lib/foods";
import { NextResponse } from "next/server";

export async function  GET(req,resp){
    let success=false
  let id =resp.params.id;
  console.log(id)
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result= await foodsSchema.findOne({_id:id});
    console.log(result)
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}
export async function PUT(req,resp){
    let success=false
    let id=resp.params.id
    const data= await req.json();
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result=await foodsSchema.findOneAndUpdate({_id:id},data)
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}