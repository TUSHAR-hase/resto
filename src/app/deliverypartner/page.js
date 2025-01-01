'use client'
import { useRouter } from 'next/navigation'
import Customerheader from '../customercomponent/customerheader'
import './delivery.css'
import Deliveryheader from '../deliveryheader/page'
import { useState ,useEffect} from 'react'


const Deliveryman = () => {

    const [name, setname] = useState();
    const [email, setemail] = useState();
    
    const [conpassword, setconpassword] = useState();
    const [city, setcity] = useState();
    const [passworderror, setpassworderror] = useState(false)
    const [error, seterror] = useState(false)
    const [contect, setcontect] = useState();
    const router = useRouter()
    const [password, setloginpassword] = useState()
    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if (delivery) {
            router.push('/deliverydashboard')
        }
    }, [])
   
    const loginhandel = async () => {
        if (!contect || !password) {
            seterror(true)
            return false
        } else {
            seterror(false)
        }
        let responce = await fetch("http://localhost:3000/api/deliverypartner/login", {
            method: 'POST',
            body: JSON.stringify({ contect, password })
        })
        responce = await responce.json();
        console.log(responce)
        if (responce.success) {
            const { result } = responce;
            delete result.password
            delete result.conpassword
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('/deliverydashboard')
            alert('Login successfully complete')

        } else {
            alert('Please,Enter Valid Detail');

        }
    }
    return (
        <div>
            <Deliveryheader></Deliveryheader>
            <div className='deliverytop'>
                <div className="deliverylogin">
                    <div className="loginbox">
                        <h1 className='loginh1'>Login</h1>

                        <div>
                            <input type='text' onChange={(e) => { setcontect(e.target.value) }} value={contect} className="login_input" placeholder="Enter the Mobile"></input>
                            {error && !contect && <span>Enter Valid Mobile</span>}
                        </div>
                        <div>
                            <input type='loginpassword' className="login_input" onChange={(e) => { setloginpassword(e.target.value) }} value={password} placeholder="Enter the Password"></input>{error && !password && <span>Enter Valid password</span>}
                        </div>
                        <div>
                            <button onClick={loginhandel} id="loginbutton">Login</button>
                        </div>


                    </div></div>


            </div>




        </div>
    )
}
export default Deliveryman;