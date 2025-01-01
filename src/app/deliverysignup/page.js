'use client'
import { useRouter } from 'next/navigation'
import Customerheader from '../customercomponent/customerheader'

import './delivery.css'
import Deliveryheader from '../deliveryheader/page'
import { useState,useEffect } from 'react'


const Deliverysignup= () => {
   
    const [name,setname]=useState();
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [conpassword,setconpassword]=useState();
    const[city,setcity]=useState();
    const[passworderror,setpassworderror]=useState(false)
    const [error, seterror] = useState(false)
    const[contect,setcontect]=useState();
    const router=useRouter()
    
    useEffect(()=>{
        const delivery=JSON.parse(localStorage.getItem('delivery'))
        if(delivery){
          router.push('/deliverydashboard')
        }
      },[])
    const signuphamdel=async()=>{
        if(password!=conpassword){
            setpassworderror(true)
            alert("passwor and conform password not match")
            return false;
        }else{
            setpassworderror(false)
        }
        if(!name||!email||!password||!conpassword||!contect||!city){
            seterror(true)
          
            return false;
          }else{
            seterror(false);
          }
    let responce= await fetch("http://localhost:3000/api/deliverypartner/signup",{
        method:'POST',
        body:JSON.stringify({name,email,password,city,contect})
    })
    responce=await responce.json();
    console.log(responce)
    if(responce.success){
       const{result}=responce
       delete result.password
       delete result.conpassword
       localStorage.setItem('delivery',JSON.stringify(result))
       router.push('/deliverydashboard')
    alert('Sign Up successfully Complete')
       
    }else{
        alert('Sign Up Unsuccessfull')
    }
    }
    
    return (
      <div>
        <Deliveryheader></Deliveryheader>
          <div className='deliverytop'>
          
            <div className="deliverysignup">
                <h1 className='signuph1'>Sign Up</h1>
                <div id='main'>

                    <div id='container1'>
                        <div >
                            <input type='text' className="sign_input" value={name} required onChange={(e) => { setname(e.target.value) }} placeholder="Enter the Name"></input>{error && !name && <span className="span1">Enter name please</span>}
                        </div>
                        <div>
                            <input type='email' className="sign_input" value={email} required onChange={(e) => { setemail(e.target.value) }} placeholder="Enter the Email"></input>{error && !email && <span className="span1">Enter email please</span>}
                        </div>
                        <div>
                            <input type='password' className="sign_input" value={password} required onChange={(e) => { setpassword(e.target.value) }} placeholder="Enter the Password"></input>{passworderror && !password && <span className="span1">Enter passwoed please</span>}
                        </div>

                    </div>
                    <div id='container2'>
                        <div>
                            <input type='text' className="sign_input" value={contect} required onChange={(e) => { setcontect(e.target.value) }} placeholder="Enter the Contect"></input>{error && !contect && <span className="span1">Enter contect please</span>}
                        </div>
                        <div>
                            <input type='text' className="sign_input" value={city} required onChange={(e) => { setcity(e.target.value) }} placeholder="Enter the city"></input>{error && !city && <span className="span1">Enter city please</span>}
                        </div>
                        <div>
                            <input type='passwoed' className="sign_input" value={conpassword} required onChange={(e) => { setconpassword(e.target.value) }} placeholder="Enter the conform Password"></input>{passworderror && !conpassword && <span className="span1">Enter conform password please</span>}
                        </div>

                    </div>
                   
                </div>
                <div>
                    <button onClick={signuphamdel} type='submit' id="signbutton">Sign Up</button>
                </div>

            </div>
        </div>
      </div>
    )
}
export default Deliverysignup;