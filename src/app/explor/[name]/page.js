"use client"
import { useEffect, useState } from "react";
import Customerheader from "../../customercomponent/customerheader";

const Page = (props) => {
    const [resturentdetail, setresturentdetail] = useState([]);
    const [fooddetail, setfooddetail] = useState([]);
    const name = props.params.name;
    const [cartitem,setcartitem]=useState();
    const[cartstorage,setcartsorage]=useState(JSON.parse(localStorage.getItem('cart')));
    const[cartid,setcartid]=useState( cartstorage?()=>cartstorage.map((item)=>{return item._id} ):[]);
    const id = props.searchParams.id
    const[removecartdata,setremovecartdata]=useState();
    console.log(cartid)
    useEffect(() => {
        resturentfooddetail();
    }, [])
    const resturentfooddetail = async () => {
        let responce = await fetch("http://localhost:3000/api/customer/" + id);
        responce = await responce.json();
        if (responce.success) {
            setresturentdetail(responce.result);
            setfooddetail(responce.foodsdetail);
            console.log(responce.foodsdetail)
        }

    }
    const removecart=(id)=>{
        setremovecartdata(id);
      var localcartid=cartid.filter(item=>item!=id);
      setcartid(localcartid)
      setcartitem()

    }

    const addtocart=(item)=>{
         
          let localcartid=cartid
          localcartid.push(item._id)
          setcartid(localcartid);
          setcartitem(item)
          setremovecartdata();
    }
    return (
        <div >
            <Customerheader cartitem={cartitem} removecartdata={removecartdata}></Customerheader>
            <div className="topbanner">
                <h1 className="topname">{decodeURI(name)}</h1>

            </div>
            <div>

                <h3>{resturentdetail?.name}</h3>
            </div>
            <div className="foodmainbox">
                {
                    fooddetail.map((item) => (<div className="foodbox">
                         <img  className="foodboximg"src={item.path}/>
                        <div className="foodboxname">{item.name}</div>
                        <div className="foodboxprice"> Rs.{item.price}</div>
                        {/* <img  src={item.path}/> */}
                        {/* <div className="description">{item.description}</div> */}
                      {
                         cartid.includes(item._id)?<button onClick={()=>removecart(item._id)} className="cartbutton">Remove</button>:
                       <button onClick={()=>addtocart(item)} className="cartbutton">Add Cart</button>
                      }
                    </div>
                    ))
                }            </div>
        </div>
    )
}
export default Page;