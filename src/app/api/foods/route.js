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
 export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    await mongoose.connect(connectionstr);
    
    const foodItem = await foodsSchema.findById(id);
    
    if (!foodItem) {
      return NextResponse.json({ success: false, message: 'Food item not found' });
    }
    
    return NextResponse.json({ success: true, result: foodItem });
  } catch (error) {
    console.error('Error fetching food item:', error);
    return NextResponse.json({ success: false, message: 'Error fetching food item' });
  }
}