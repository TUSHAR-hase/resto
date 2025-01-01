'use client'

import { useRouter } from 'next/navigation'
import './userlogin.css'
import { useState } from 'react'
const User_login = (props) => {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const router=useRouter();
    const [error, seterror] = useState(false)
    const loginhandel =async () => {
        if (!email || !password) {
            seterror(true)
            return false
        } else {
            seterror(false)
        }
        let responce= await fetch("http://localhost:3000/api/user/login",{
            method:'POST',
            body:JSON.stringify({email,password})
        })
        responce=await responce.json();
        console.log(responce)
        if(responce.success){
            const {result}=responce;
            delete result.password
            delete result.conpassword
            localStorage.setItem('user',JSON.stringify(result));
          
            if(props?.redirect?.order){
                router.push('/order')
            }else{
                router.push('/')
            }

        }else{
            alert('Please,Enter Valid Detail');
            router.push('/user_auth')
        }
    }
    return (
        <div className='marginlogin'>
            <div className="loginbox">
                
                <div>
                    <input type='email' onChange={(e) => { setemail(e.target.value) }} value={email} className="login_input" placeholder="Enter the Email"></input>
                    {error && !email && <span>Enter Valid email</span>}
                </div>
                <div>
                    <input type='password' className="login_input" onChange={(e) => { setpassword(e.target.value) }} value={password} placeholder="Enter the Password"></input>{error && !password && <span>Enter Valid password</span>}
                </div>
                <div>
                    <button onClick={loginhandel} id="loginbutton">Login</button>
                </div>
                

            </div>
        </div>
    )
}
export default User_login