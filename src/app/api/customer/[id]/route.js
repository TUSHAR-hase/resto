import mongoose from "mongoose"
import { connectionstr } from "../../../lib/db"
import { signupSchema } from "../../../lib/signupModal";
import { NextResponse } from "next/server";
import { foodsSchema } from "../../../lib/foods";

export async function  GET(req,resp){
    const id=resp.params.id
await mongoose.connect(connectionstr,{useNewUrlParser:true});
const result=await signupSchema.findOne({_id:id})
const foodsdetail=await foodsSchema.find({resto_id:id})
return NextResponse.json({success:true,result,foodsdetail})

}
export async function  DELETE(){
    // await mongoose.connect(connectionstr,{useNewUrlParser:true})
    // const result=await foodsSchema.deleteOne()
    // return NextResponse.json({success:true})
}