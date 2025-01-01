import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionstr } from "../../lib/db";
import { signupSchema } from "../../lib/signupModal";

export async function GET(req) {
    let querryparams = req.nextUrl.searchParams
   
    let filter = {}
    if (querryparams.get("address")) {
        let address = querryparams.get('address');

        filter = { address: { $regex: new RegExp(address, 'i') } }

    } else if (querryparams.get("name")) {
        let name = querryparams.get('name')
        filter = { name: { $regex: new RegExp(name, 'i') } }

    }
    await mongoose.connect(connectionstr, { useNewUrlParser: true });
    let result = await signupSchema.find(filter);
    return NextResponse.json({ success: true, result })
}