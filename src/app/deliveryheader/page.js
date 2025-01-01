"use client"
import Link from 'next/link';
import './header.css';
import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { useRouter } from 'next/navigation';
const Deliveryheader = (props) => {
    const cartstorage = JSON.parse(localStorage.getItem('cart'));
    const [cartnumber, setcartnumber] = useState(cartstorage?.length);
    const [cartdata, setcartdata] = useState(cartstorage);
   const[delivery,setdelivery]=useState(JSON.parse(localStorage.getItem('delivery')))
    const router=useRouter()
    const userdata = JSON.parse(localStorage.getItem('user'))
    const [user, setuser] = useState(userdata ? userdata : undefined)
 
   
   

   
        
    const logout=()=>{
        localStorage.removeItem('delivery')
        router.push('/deliverypartner')
    }
    const signup=()=>{
        router.push('/deliverysignup')
    }
    const login=()=>{
        router.push('/deliverypartner')
    }



 
 

    return (
        <div>
            <nav className="custmernav">
                <h3 id='logo'>Food Fest</h3>
                {/* <div className="customerlink"> <Link className="Link" href='/'>Menu</Link></div>
                <div className="customerlink"><Link className="Link" href='/'>Contect</Link></div>
                <div className="customerlink"><Link className="Link" href='/'>About</Link></div>
                <div className="customerlink"> <Link className="Link" href='/'>Home</Link></div> */}

                <div className="rightnav">

                <div className="customerlink"><Link className="Link" href='/'>Home</Link></div>
                    <div className="customerlink"><Link className="Link" href='/deliverypartner'>DeliveryPartner</Link></div>
                    {
                        delivery ? <div className="navbutton"><button className=" logoutbutton" onClick={logout} >Log out</button></div> :
                            <>  <div className="navbutton"><button onClick={signup} className="button" href='/signup' >SignUp</button></div>
                                <div className="navbutton"><button onClick={login} className="button">Login</button></div>
                            </>
                    }

                </div>

            </nav>
        </div>
    )
}
export default Deliveryheader;