import mongoose from "mongoose";
import { connectionstr } from "../../lib/db";
import { orderSchema } from "../../lib/orderModal";
import { NextResponse } from "next/server";
import { signupSchema } from "../../lib/signupModal";
import { foodsSchema } from "../../lib/foods";

export async function POST(req) {
    const data = await req.json();
    let success = false
    await mongoose.connect(connectionstr, { useNewUrlParser: true })
    const info = new orderSchema(data)
    const result = await info.save();
    if (result) {
        success = true
    }
    return NextResponse.json({ success, result })
}
// export async function GET(req) {
//    let id = req.nextUrl.searchParams.get('id')
//    console.log(id)
//    let success = false
//    let result = id;
//    await mongoose.connect(connectionstr, { useNewUrlParser: true });
//    result = await orderSchema.find({ user_id: id })

//    if (result) {
//       let restodata = await Promise.all(
//          result.map(async (item) => {
//             let restoinfo = {}
//             restoinfo.data = await signupSchema.findOne({ _id: item.resto_id })
//             restoinfo.amount=item.amount;
//             restoinfo.status=item.status
//             return restoinfo
//          })

//       )
//       result = restodata
//       success=true
//    }

//    return NextResponse.json({ result,success })

// }
// In your API route (api/order.js)

export async function GET(req) {
    let id = req.nextUrl.searchParams.get('id')
    let success = false
    let result = null;

    try {
        await mongoose.connect(connectionstr, { useNewUrlParser: true });

        // Fetch orders for the user
        const userOrders = await orderSchema.find({ user_id: id });

        // Enhance the response with restaurant details
        result = await Promise.all(
            userOrders.map(async (order) => {
                const restaurant = await signupSchema.findOne({ _id: order.resto_id });
                const orderData = {
                    _id: order._id,
                    amount: order.amount,
                    foodids: order.foodids,
                    status: order.status,
                    createdAt: order.createdAt,
                    data: {
                        name: restaurant?.name || "Unknown Restaurant",
                        address: restaurant?.address || "Address not available"
                    }
                };
                return orderData;
            })
        );

        success = true;
    } catch (error) {
        console.error("Error fetching orders:", error);
        result = { error: "Failed to fetch orders" };
    }

    return NextResponse.json({ result, success });
}