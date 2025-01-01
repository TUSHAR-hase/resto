'use client'
import { useEffect, useState } from "react";
import Customerheader from "../customercomponent/customerheader";
import { Delivery_charge, Tex } from "../constant";
import { useRouter } from "next/navigation";
import './order.css'
const Order = () => {
    const [cartstorage, setcartsorage] = useState(JSON.parse(localStorage.getItem('cart')));
   
    const router = useRouter()
    const [removecartdata, setremovecartdata] = useState();
    const userdata = JSON.parse(localStorage.getItem('user'));
    const [Total] = useState(() => cartstorage?.length == 1 ? cartstorage[0].price : cartstorage?.reduce((a, b) => { return a.price + b.price }))
    console.log(Total)
    
    useEffect(() => {
        if (!Total) {
            router.push('/')
        }
    }, [Total])
   
    const placeorder = async () => {
        const user_id = JSON.parse(localStorage.getItem('user'))._id
        const city = JSON.parse(localStorage.getItem('user')).city
        const cart = JSON.parse(localStorage.getItem('cart'));
        const resto_id = cart[0].resto_id
        
        const amount = Total + Delivery_charge + (Tex * Total / 100)
        const foodids = cart.map((item) => item._id).toString()
        const status='Conform'
        let deliveryresponce=await fetch('http://localhost:3000/api/deliverypartner/'+city)
        deliveryresponce=await deliveryresponce.json();
       
       let deliveryids=deliveryresponce.result.map((item)=>item._id)
       let deliveryboy_id=deliveryids[Math.floor(Math.random()*deliveryids.length)]
       console.log(deliveryboy_id)
       if(!deliveryboy_id){
        alert('delivery boy not found')
        return false
       }
      
        let collection = {
            user_id,
            resto_id,
            deliveryboy_id
            , amount,
            status,
            foodids
        }
        let responce = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            body: JSON.stringify(collection)
        })
        responce = await responce.json();
        if (responce.success) {
            alert("order conformed")
            setremovecartdata(true)
            router.push('/myprofile')
            console.log(deliveryboy_id)

        }
        console.log(collection)
    }
    return (
        <div>
            <div >
                <Customerheader removecartdata={removecartdata} ></Customerheader>


            </div>
            <div className="toporder">
                <div className="toptotalorder">
                    <div className="orderbox">
                        <h1>Customer Detail</h1>
                        <div className="minitotalorderbox">
                            <span>Customer Name:</span>
                            <span>{userdata.name}</span>
                        </div>
                        <div className="minitotalorderbox">
                            <span>Customer Address:</span>
                            <span>{userdata.city}</span>
                        </div>
                        <div className="minitotalorderbox">
                            <span>Customer Contect:</span>
                            <span>{userdata.contect}</span>
                        </div>
                    </div>
                    <div className="orderbox">
                        <h1>Amount Detail</h1>
                        <div className="minitotalorderbox">
                            <span>Food charges:</span>
                            <span>{Total}</span>
                        </div>
                        <div className="minitotalorderbox">
                            <span>Tex:</span>
                            <span>{Tex * Total / 100}</span>
                        </div>
                        <div className="minitotalorderbox">
                            <span>Delivery charges:</span>
                            <span>{Delivery_charge}</span>
                        </div>
                        <div className="minitotalorderbox">
                            <span>Total amount:</span>
                            <span>{Total + Delivery_charge + (Tex * Total / 100)}</span>
                        </div>

                    </div>
                    <div className="orderbox">
                        <h1>Payment Method</h1>
                        <div className="minitotalorderbox">
                            <span>Case On Delivery:</span>
                            <span>{ }</span>
                        </div>
                    </div>
                    <div><button onClick={placeorder} className="placeorderbutton">Place Your Order</button></div>
                </div>

            </div>

        </div>
    )
}
export default Order;