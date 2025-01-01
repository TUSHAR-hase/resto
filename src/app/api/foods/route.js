import mongoose from "mongoose";
import { connectionstr } from "../../lib/db";

import { NextResponse } from "next/server";
import { foodsSchema } from "../../lib/foods";

 export async function POST(req){
          let data=await req.json();
          let success=false;
          await mongoose.connect(connectionstr,{useNewUrlParser:true})
          const result= new foodsSchema(data);
          const info=await result.save();
          if(info){
            success=true;
          }
          return NextResponse.json({info,success})
 }