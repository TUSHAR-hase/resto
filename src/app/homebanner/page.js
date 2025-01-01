"use client"
import './home.css'
import bgimg from '/public/images/bgimg.jpg'
import Header from "../header/page";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Homebanner = () => {
   const [selectloction, setselectloction] = useState([]);
   const [location, setlocation] = useState();
   const [resturent, setresturent] = useState([]);
   const [showlocation, setshowlocation] = useState(false);
const router=useRouter();
   useEffect(() => {
      getlocations();
      getrestorent()
   }, [])
   const getrestorent = async (params) => {

      let url = "http://localhost:3000/api/customer";
      if (params?.address) {
         url = url + "?address=" + params.address
      } else if (params?.name) {
         url = url + "?name=" + params.name
      }


      let responce = await fetch(url)
      responce = await responce.json();
      if (responce.success) {
         setresturent(responce.result)
         console.log(resturent.name)

      }
   }
   const getlocations = async () => {
      let responce = await fetch("http://localhost:3000/api/customer/location")
      responce = await responce.json();

      if (responce.success) {
         setselectloction(responce.result)

      }
   }
   const handallocation = (item) => {
      setlocation(item)
      getrestorent({ address: item })
      setshowlocation(false)
   }
   return (
      <div>
         <div className="bg">

            <div className="box" >
               <div className="input-wrepper">
                  <input placeholder="Search City" onClick={() => setshowlocation(true)} value={location} id="searchfood" /><span>  <ul className='location-list'>
                     {

                        showlocation && selectloction.map((item) => (

                           <li onClick={() => handallocation(item)}>{item}</li>
                        ))

                     }
                  </ul></span>

                  <input onChange={(e) => getrestorent({ name: e.target.value })} placeholder="Search Resturent By Name" id="searchresto" />
               </div>
               <div className="mainbox">
                  <div className="box1"><h1 id="h1" >Everything <br></br>is better With a  <div id="pizza">pizza</div></h1>

                     <button onClick={()=>router.push('/user_auth')} id="button1">ORDER NOW</button>
                  </div>
                  <div className="box1"> <Image alt="image" priority={true} height={231} width={331} src={bgimg} id="bgimg"></Image></div>
               </div>

            </div>
         </div>
         <div className="resturentbox">
   {
      resturent.map((item) => (
         <div 
            onClick={() => router.push(`explor/${item.name}?id=${item._id}`)} 
            className="resturentbox1"
         >
            <div className="resturentbox-content">
               <h1 className="resturent-name">{item.name}</h1>
               <h4 className="resturent-contact">Contact: {item.contect}</h4>
               <div className="resturent-details">
                  Location: {item.address} <br />
                  <br />
                  Email: {item.email}
               </div>
            </div>
         </div>
      ))
   }
</div>

         {/* <div className='resturentbox'>
            {
               resturent.map((item) => (
                  <div onClick={()=>router.push("explor/"+item.name+"?id="+item._id)} className='resturentbox1'>
                     <div>
                        <h1 id='h1'>{item.name}</h1>
                        <h4>contect:{item.contect}</h4>
                     </div>
                     <div className='resturentbox3'>location:{item.address}<br></br><br></br> Email:{item.email}</div>
                  </div>
               ))
            }

         </div> */}
      </div>
   )
}
export default Homebanner;