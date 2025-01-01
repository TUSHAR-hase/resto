"use client"
import Link from "next/link";
import "./header.css"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
const Header = () => {
    const [detail,setdetail]=useState();
    const router=useRouter();
    const [login, setlogin] = useState(false);

    const pathname=usePathname();
    // useEffect(()=>{
    //     let data=localStorage.getItem("my_memory");
    //     if(!data && pathname=="/dashboard"){
    //         router.push("/signup")
    //     }else if(data && pathname=="/signup"||data&&pathname=='/login'){
    //         router.push("/dashboard")
    //     }
    //     else{
    //         setdetail(JSON.parse(data));
    //     }
        
    // },[login,router]);
    useEffect(() => {
        if (typeof window !== "undefined") { // Ensures this runs only in the browser
            let data = localStorage.getItem("my_memory");
            if (!data && pathname === "/dashboard") {
                router.push("/signup");
            } else if (data && (pathname === "/signup" || pathname === "/login")) {
                router.push("/dashboard");
            } else {
                setdetail(JSON.parse(data || "{}"));
            }
        }
    }, [pathname, router]);
    const logout=()=>{
        localStorage.removeItem("my_memory");
        router.push("/signup")
        setdetail("");
        
    } 
     const loginchange=()=>{
      if(login){
        router.push("/login")
      }else{
        router.push("/signup")
      }
        
    }

    return (
        <div>
            <nav className="nav">
                <h3 id='logo'>Rv Pizza</h3>
                <div className="navlink"> <Link id="Link" href='/'>Home</Link></div>        
                <div className="navlink"> <Link id="Link" href='/'>Menu</Link></div>
                <div className="navlink"><Link id="Link" href='/'>Contect</Link></div>
                <div className="navlink"><Link id="Link" href='/'>About</Link></div>                   

             <div className="rightnav">
               {detail && detail.name?<>
                <div className="navlink"><Link id="Link" href='/'>Profile</Link></div>
                <div className="navbutton"><button id="button" onClick={logout}>Logout</button></div>
                </>:            <div className="navbutton"><button onClick={()=>{setlogin(!login);
                    loginchange();}
                } id="button">{login?"Login":"Signup"}</button></div>      } 
             
             </div>

            </nav>

        </div>
    )
}
export default Header;