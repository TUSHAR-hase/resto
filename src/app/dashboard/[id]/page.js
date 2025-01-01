"use client"


import { useRouter } from 'next/navigation';
import '../dashboard.css';
import { useState ,useEffect} from 'react';
const Editfooditem = (probs) => {
 
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [error, seterror] = useState(false);
    const [path, setpath] = useState("");
    const [description, setdescription] = useState("");
    const router=useRouter();
    useEffect(()=>{
        loaddata();
    },[])
   
    // const food_data = async () => {
    //     if (!name || !price || !path || !description) {
    //         seterror(true)
    //         return false;
    //     } else {
    //         seterror(false);
    //     }
       const loaddata=async()=>{
        let responce=await fetch("http://localhost:3000/api/foods/edit/"+probs.params.id)
        responce=await responce.json();
       
        if(responce.success){
           setname(responce.result.name)
           setprice(responce.result.price)
           setpath(responce.result.path)
           setdescription(responce.result.description)
            
        }
       
       }
       const updetapi=async()=>{

        let responce=await fetch("http://localhost:3000/api/foods/edit/"+probs.params.id,{
           method:"PUT",
           body:JSON.stringify({name,price,path,description})
        })
        responce=await responce.json();
        if(responce.success){
            // loaddata();
            router.push("/dashboard")
            alert(" food data updeted")
        }else{
            alert(" food data not updeted")

        }
               }

    return (
        <div>

            <div className="editfoodbox">
                <h2>Edit  Item</h2>
                <div>
                    <input type='text' onChange={(e) => { setname(e.target.value) }} value={name} className="editfood_input" placeholder="Enter the Name"></input>
                    {error && !name && <span>Enter Valid Name</span>}
                </div>
                <div>
                    <input type='text' onChange={(e) => { setprice(e.target.value) }} value={price} className="editfood_input" placeholder="Enter the price"></input>
                    {error && !price && <span>Enter Valid price</span>}
                </div>
                <div>
                    <input type='text' onChange={(e) => { setpath(e.target.value) }} value={path} className="editfood_input" placeholder="Enter the Path"></input>
                    {error && !path && <span>Enter Valid Path</span>}
                </div>
                <div>
                    <input type='text' onChange={(e) => { setdescription(e.target.value) }} value={description} className="editfood_input" placeholder="Enter the Description"></input>
                    {error && !description && <span>Enter Valid Description</span>}
                </div>
                <div>
                    <button onClick={updetapi} id="edititembutton">Edit item</button>
                </div>
            </div>
        </div>
    )
}
export default Editfooditem;