
'use client'
import { useState } from 'react';
import Header from '../header/page';
import './addfood.css';
const Addfooditem = (probs) => {
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [error, seterror] = useState(false);
    const [path, setpath] = useState("");
    const [description, setdescription] = useState("");
    const food_data = async () => {
        if (!name || !price || !path || !description) {
            seterror(true)
            return false;
        } else {
            seterror(false);
        }
        const restodata = JSON.parse(localStorage.getItem("my_memory"))
        let resto_id;
        
            resto_id = restodata._id
        
        let responce = await fetch("http://localhost:3000/api/foods", {
            method: "POST",
            body: JSON.stringify({ name, price, path, description, resto_id })
        })
        try{
            responce = await responce.json();
        }catch(error){
            console.error(error)
        }
        if (responce.success) {
            probs.settogal(false);
            alert("food item added")
        }
        else {

            alert(" food item not added")
        }
    }

    return (
        <div>

            <div className="addfoodbox">
                <h2>Add Item</h2>
                <div>
                    <input type='text' onChange={(e) => { setname(e.target.value) }} value={name} className="addfood_input" placeholder="Enter the Name"></input>
                    {error && !name && <span>Enter Valid Name</span>}
                </div>
                <div>
                    <input type='text' onChange={(e) => { setprice(e.target.value) }} value={price} className="addfood_input" placeholder="Enter the price"></input>
                    {error && !price && <span>Enter Valid price</span>}
                </div>
                <div>
                    <input type='text' onChange={(e) => { setpath(e.target.value) }} value={path} className="addfood_input" placeholder="Enter the Path"></input>
                    {error && !path && <span>Enter Valid Path</span>}
                </div>
                <div>
                    <input type='text' onChange={(e) => { setdescription(e.target.value) }} value={description} className="addfood_input" placeholder="Enter the Description"></input>
                    {error && !description && <span>Enter Valid Description</span>}
                </div>
                <div>
                    <button onClick={food_data} id="additembutton">Add item</button>
                </div>
            </div>
        </div>
    )
}
export default Addfooditem;