
"use client"
import { useState } from 'react';
import './sign.css';
import Header from '../header/page';
import { useRouter } from 'next/navigation';

const Sign = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [conpassword, setconpassword] = useState('');
    const [contect, setcontect] = useState('');
    const [address, setaddress] = useState('');
    const [login, setlogin] = useState(false);
    const [passworderror, setpassworderror] = useState(false);
    const [error, seterror] = useState(false);
    const router = useRouter();

    const userdata = async () => {
        if (password !== conpassword) {
            setpassworderror(true);
            alert("Password and confirm password do not match");
            return false;
        } else {
            setpassworderror(false);
        }

        if (!name || !email || !password || !conpassword || !contect || !address) {
            seterror(true);
            return false;
        } else {
            seterror(false);
        }

        let response = await fetch("http://localhost:3000/api", {
            method: "POST",
            body: JSON.stringify({ name, email, password, conpassword, contect, address }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        response = await response.json();
        if (response.success) {
            const { info } = response;
            delete info.password;
            delete info.conpassword;
            localStorage.setItem("my_memory", JSON.stringify(info));
            router.push("/dashboard");
        }
    };

    return (
        <div>
            <Header />
            <div id="top">
                <div id="main">
                    <h1 id="h1sign">Sign Up</h1>
                    <div id="container1">
                        <input
                            type="text"
                            className="sign_input"
                            value={name}
                            required
                            onChange={(e) => setname(e.target.value)}
                            placeholder="Enter your Name"
                        />
                        {error && !name && <span>Enter name please</span>}
                        <input
                            type="email"
                            className="sign_input"
                            value={email}
                            required
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter your Email"
                        />
                        {error && !email && <span>Enter email please</span>}
                        <input
                            type="password"
                            className="sign_input"
                            value={password}
                            required
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Enter your Password"
                        />
                        {passworderror && !password && <span>Password and confirm password do not match</span>}
                    </div>
                    <div id="container2">
                        <input
                            type="text"
                            className="sign_input"
                            value={contect}
                            required
                            onChange={(e) => setcontect(e.target.value)}
                            placeholder="Enter your Contact"
                        />
                        {error && !contect && <span>Enter contact please</span>}
                        <input
                            type="text"
                            className="sign_input"
                            value={address}
                            required
                            onChange={(e) => setaddress(e.target.value)}
                            placeholder="Enter your Address"
                        />
                        {error && !address && <span>Enter address please</span>}
                        <input
                            type="password"
                            className="sign_input"
                            value={conpassword}
                            required
                            onChange={(e) => setconpassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        {passworderror && !conpassword && <span>Password and confirm password do not match</span>}
                    </div>
                    <div>
                        <button type="submit" onClick={userdata} id="signbutton">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sign;
