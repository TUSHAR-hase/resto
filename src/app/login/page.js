"use client"
import { useEffect, useState } from 'react';
import Header from '../header/page';
import './login.css';
import { useRouter } from 'next/navigation';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
const Login=()=>{
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [error,seterror]=useState(false);
    const [login,setlogin]=useState(false);

    const router=useRouter();
    const logindata=async()=>{
        if(!email||!password){
            seterror(true)
            return false;
          }else{
            seterror(false);
          }
          let responce=await fetch("http://localhost:3000/api",{
            method:'POST',
            body:JSON.stringify({email,password,login:true})
          })
          responce=await responce.json();
          if(responce.success){
            let {info}=responce
            delete info.password
            localStorage.setItem("my_memory",JSON.stringify(info));
            router.push("/dashboard")
            
          }else{
            alert("Login Faild")
          }
    }
    // useEffect(()=>{
    //   handlechange();
    // },[login])
    // const handlechange=(e)=>{
    //   if(login){
    //     router.push("/login")
    //   }else{
    //     router.push("/signup")
    //   }
    // }
    return(
        <div>
            <Header></Header>
<div className="loginbox">
    <div>
        <h1 id='h1login'>Login</h1>
    </div>
    <div>
        <input type='email'  onChange={(e)=>{setemail(e.target.value) }} value={email} className="login_input" placeholder="Enter the Email"></input>
        {error && !email && <span>Enter Valid email</span>}
    </div>
    <div>
        <input type='password' className="login_input" onChange={(e)=>{setpassword(e.target.value) }} value={password} placeholder="Enter the Password"></input>{error && !password && <span>Enter Valid password</span>}
    </div>
    <div>
       <button onClick={logindata} id="loginbutton">Login</button>
    </div>
    {/* <div>'You have no accout ? sign up'</div> */}

</div>
        </div>
    )
}
export default Login;