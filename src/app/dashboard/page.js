"use client"
import { useState } from "react";
import Header from "../header/page";
import './dashboard.css'
import Addfooditem from "../addfooditem/page";
import Additemlist from "../additemlist/page";
const Dashboard = () => {
    const [togal, settogal] = useState();
    return (
        <div>
            <Header></Header>

            <div className="buttonbox" >
                <button onClick={() => { settogal(true) }} className="dashboardbutton">Add Food</button>
                <button onClick={() => { settogal(false) }} className="dashboardbutton">Dashboard</button>

            </div>
            {togal ? <Addfooditem settogal={settogal}/> : <Additemlist/>}

        </div>
    )
}
export default Dashboard;