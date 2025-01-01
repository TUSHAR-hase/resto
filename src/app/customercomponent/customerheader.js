"use client"
import Link from 'next/link';
import './custmerheader.css';
import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { useRouter } from 'next/navigation';
const Customerheader = (props) => {
    const cartstorage = JSON.parse(localStorage.getItem('cart'));
    const [cartnumber, setcartnumber] = useState(cartstorage?.length);
    const [cartdata, setcartdata] = useState(cartstorage);
   
    const router=useRouter()
    const userdata = JSON.parse(localStorage.getItem('user'))
    const [user, setuser] = useState(userdata ? userdata : undefined)

    useEffect(() => {
        if (props.cartitem) {

            if (cartnumber) {
                if (cartdata[0].resto_id != props.cartitem.resto_id) {
                    localStorage.removeItem('cart')
                    setcartnumber(1);
                    setcartdata([props.cartitem]);
                    localStorage.setItem('cart', JSON.stringify([props.cartitem]))
                } else {
                    let localcartstorage = cartdata;
                    localcartstorage.push(JSON.parse(JSON.stringify(props.cartitem)));
                    setcartnumber(cartnumber + 1);
                    setcartdata(localcartstorage);
                    localStorage.setItem('cart', JSON.stringify(localcartstorage))
                }
            } else {
                setcartnumber(1);
                setcartdata([props.cartitem])
                localStorage.setItem('cart', JSON.stringify([props.cartitem]))

            }

        }

    }, [props.cartitem])
    useEffect(() => {
        console.log(props)
        if (props.removecartdata) {
            let localcartstorage = cartdata.filter((item) => {
                return item._id != props.removecartdata;
            })
            setcartdata(localcartstorage)

            setcartnumber(cartnumber - 1);
            localStorage.setItem('cart', JSON.stringify(localcartstorage))
            if (localcartstorage.length == 0) {
                localStorage.removeItem('cart');
            }
        };



    }, [props.removecartdata])
    useEffect(()=>{
           if(props.removecartdata){
            setcartnumber(0)
            setcartdata([])
            localStorage.removeItem('cart')
           }
    },[props.removecartdata])
    const logout=()=>{
        localStorage.removeItem('user')
        router.push('/user_auth')
    }
    const signup=()=>{
        router.push('/user_auth')
    }
    const login=()=>{
        router.push('/user_auth')
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

                    <div className="customerlink"><Link className="Link" href={cartnumber ? '/cart' : '/'}>Cart({cartnumber ? cartnumber : 0})</Link></div>
                    <div className="customerlink"><Link className="Link" href='/signup'>Add Resturent</Link></div>
                    <div className="customerlink"><Link className="Link" href='/myprofile'>Profile</Link></div>
                    <div className="customerlink"><Link className="Link" href='/deliverypartner'>DeliveryPartner</Link></div>
                    {
                        user ? <div className="navbutton"><button className=" logoutbutton" onClick={logout} >Log out</button></div> :
                            <>  <div className="navbutton"><button onClick={signup} className="button" href='/signup' >SignUp</button></div>
                                <div className="navbutton"><button onClick={login} className="button">Login</button></div>
                            </>
                    }

                </div>

            </nav>
        </div>
    )
}
export default Customerheader;