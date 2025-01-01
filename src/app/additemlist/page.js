"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Additemlist = () => {
    const [fooditem, setitem] = useState("");
    const router=useRouter();
    useEffect(() => {
        itemlist();

    }, []);


    const itemlist = async () => {
        const restodata = JSON.parse(localStorage.getItem("my_memory"))
      let restoid
       if(restodata){
        restoid = restodata._id;
        console.log(restoid)
       }else{

       }
        
        let responce = await fetch("http://localhost:3000/api/foods/" + restoid);
       
        try {
            responce = await responce.json();
console.log(responce)
            // Process the JSON data here
        } catch (error) {
            console.error("Error parsing JSON:", error);
            // Handle the error appropriately (e.g., display an error message to the user)
        }

        if (responce.success) {
            setitem(responce.result);
           

        } else {
           
            alert("food item not display")
        }
       
    }
    const deleteitem = async (id) => {
        console.log(id)
        let responce = await fetch("http://localhost:3000/api/foods/" + id, {
            method: "delete"
        });
      try{
        responce=await responce.json();
      }catch (error){
        console.error(error)
      }
        if(responce.success){
            itemlist();
            alert("food item added delete")
        }
        else{
            alert("food item not delete")
        }

    }
    return (
        <div className="tablebox">
            <h1>add item</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>image</td>
                        <td>description</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        fooditem && fooditem.map((item, key) => (
                            <tr key={item.id}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td><img src={item.path}/></td>
                                <td>{item.description}</td>
                                <td className="td"><button onClick={()=>deleteitem(item._id)}>Delete</button>
                                    <button onClick={()=> {router.push("/dashboard/"+item._id)}}>Edit</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default Additemlist;