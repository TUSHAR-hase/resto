'use client'
import { useEffect, useState } from "react";
import Customerheader from "../customercomponent/customerheader";
import { Delivery_charge, Tex } from "../constant";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartstorage, setcartsorage] = useState(JSON.parse(localStorage.getItem('cart')));
  const [cartnumber, setcartnumber] = useState(cartstorage?.length)
  const router=useRouter()
  const[Total]=useState(()=>cartstorage.length==1?cartstorage[0].price:cartstorage.reduce((a,b)=>{return a.price+b.price}))
  console.log(Total)
  useEffect(() => {
    removecart();

  }, [cartnumber,cartstorage])
  const removecart = (id) => {
    let localdata = cartstorage.filter((item) => {
      return item._id != id
    })
    setcartsorage(localdata);

    localStorage.setItem('cart', JSON.stringify(localdata))
    setcartnumber(cartnumber - 1);
    if(localdata.length==0){
      localStorage.removeItem('cart')

      router.push('/')
    }
   
  }
  const orderbutton=()=>{
    if(JSON.parse(localStorage.getItem('user'))){
      router.push('/order')
    }else{
      router.push('/user_auth?order=true')
    }
}

  return (
    <div>
      <div >
        <Customerheader ></Customerheader>
      
        <div>


        </div>
        <div className="foodmainbox">
          {
            cartstorage.map((item,index) => (<div key={index} className="foodbox">
              <img alt="Company Logo" className="foodboximg" src={item.path} />
              <div className="foodboxname">{item.name}</div>
              <div className="foodboxprice"> Rs.{item.price}</div>

              {
                <button onClick={() => removecart(item._id)} className="cartbutton">Remove</button>

              }
            </div>
            ))
          }  
                    </div>
      </div>
     <div className="toptotal">
     <div className="totalbox">
        <div className="minitotalbox">
          <span>Food charges:</span>
          <span>{Total}</span>
        </div>
        <div className="minitotalbox">
          <span>Tex:</span>
          <span>{Tex*Total/100}</span>
        </div>
        <div className="minitotalbox">
          <span>Delivery charges:</span>
          <span>{Delivery_charge}</span>
        </div>
        <div className="minitotalbox">
          <span>Total amount:</span>
          <span>{Total+Delivery_charge+(Tex*Total/100)}</span>
        </div>
        <div><button onClick={orderbutton} className="cartorderbutton">Order now</button></div>
      </div>
     </div>
    </div>
  )
}
export default Cart;