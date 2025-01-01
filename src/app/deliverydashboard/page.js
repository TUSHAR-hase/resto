'use client'

import { useRouter } from "next/navigation"
import Deliveryheader from "../deliveryheader/page"

import './dashboard.css'
import { useState,useEffect } from "react"


const DeliveryDashboard=()=>{
  const router=useRouter()
  const[order,setorder]=useState([]);
  const deliverydata=JSON.parse(localStorage.getItem('delivery'))._id
  console.log(deliverydata)
    useEffect(()=>{
        const delivery=JSON.parse(localStorage.getItem('delivery'))
        if(!delivery){
          router.push('/deliverypartner')
        }
      },[])
      useEffect(() => {
        myorder();
    }, [])
    const myorder = async () => {
        let responce = await fetch("http://localhost:3000/api/deliverypartner/orders/"+deliverydata)
        responce = await responce.json();
        if (responce.success) {
            setorder(responce.result);

        }
    }
    return(
        <div>
            <Deliveryheader></Deliveryheader>
            <div className="toporderbox">
            {
                order.map((item,index) => (
                    <div key={index} className="orderbox">
                        <div className="restoname">
                            {item.data.name}
                        </div>
                        <div>
                            Address:{item.data.address}
                        </div>
                        <div>Amount:{item.amount}</div>
                        <div>Status:{item.status}</div>
                        <div>Status Updet:<select><option>Confirm</option>
                        <option>Delivered</option>
                        <option>On The Way</option>
                        <option>Delivery Faild</option></select></div>
                    </div>
                ))
            }</div>
        </div>
    )
}
export default DeliveryDashboard;