'use client'
import { useEffect, useState } from "react"
import Customerheader from "../customercomponent/customerheader";
import './profile.css'
const Profile = () => {
    const userid = JSON.parse(localStorage.getItem('user'))
    console.log(userid._id)
    const [order, setorder] = useState([]);
    useEffect(() => {
        myorder();
    }, [])
    const myorder = async () => {
        let responce = await fetch('http://localhost:3000/api/order?id=' + userid._id)
        responce = await responce.json();
        if (responce.success) {
            setorder(responce.result);

        }
    }
    return (<div>
        <Customerheader></Customerheader>
        <div className="toporderbox">
            {
                order.map((item,index) => (
                    <div  key={item.id} className="orderbox">
                        <div className="restoname">
                            {item.data.name}
                        </div>
                        <div>
                            Address:{item.data.address}
                        </div>
                        <div>Amount:{item.amount}</div>
                        <div>Status:{item.status}</div>
                    </div>
                ))
            }</div>
    </div>)
}
export default Profile;