import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionstr } from "../../../lib/db";
import { foodsSchema } from "../../../lib/foods";



export async function GET(req, resp) {
    const id=resp.params.id
   let success=false
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result= await foodsSchema.find({resto_id:id})
    if(result){
        success=true
    }
    return NextResponse.json({result, success})

}

export async function DELETE(req,resp){
const id=resp.params.id
console.log(id)
    let success=false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const result= await foodsSchema.deleteOne({_id:id})
    if(result.deletedCount>0){
        success=true
    }
    return NextResponse.json({result,success})
}