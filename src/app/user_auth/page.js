'use client'
import { useEffect, useState } from "react"
import Customerheader from "../customercomponent/customerheader"
import Usersignup from "../usersignup/page"
import User_login from "../user_login/page"

const Userauth = (props) => {
    console.log(props.searchParams)
    const [login, setlogin] = useState(false)
    return (
        <div>
            <div>
                <Customerheader></Customerheader>
            </div>

            <div>
                <div className="tophead">
                    {login ? <h1 className="h1head">Login</h1> : <h1 className="h1head"> Sign Up</h1>}
                </div>
                {login ? <User_login redirect={props.searchParams}></User_login> : <Usersignup redirect={props.searchParams}></Usersignup>}
                <div className="togalbox">
                <button className="togaluserbutton" onClick={() => setlogin(!login)}>{login ? 'You have no account,Sign Up' : 'You have already account,Login'}</button>
            </div>
            </div>
           
        </div>
    )
}
export default Userauth