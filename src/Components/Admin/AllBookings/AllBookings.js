import React,{useState, useEffect} from 'react'
import {Row, Col, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faRupeeSign,
  faCalendarAlt,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import firebase from 'firebase'
import { auth, database } from "../../../config";
import AdminNavigationBar from '../navbar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllBookings() {

    //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [listings, setListings] = useState([]);
  const [tableData,setTableData] = useState([]);
  const [pendingBooking,setPendingBookings] = useState([])
   //spinner
   const [loading, setLoading] = useState(true);
   const [selectedButton,setSelectedButton] = useState('pendingBooking')
   const [confirmedBooking,setConfirmedBookings] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState(false);
      } else {
        setAuthState(true);
        setUserUid(user.uid);
      }
    });
  }, []);

    
  useEffect(() => {
    database
      .ref("Bookings")
      .orderByChild("userUid")
      .equalTo(userUid)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setListingsCheck(true);
          {setLoading(false)}
        } else {
          setListingsCheck(false);
          {setLoading(false)}
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [userUid]);
  //

  //get listing data
  useEffect(() => {
    database
      .ref("Bookings")
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: data.propertyKey,
            arrivalDate: data.arrivalDate,
            departDate: data.departDate,
            guests: data.guests,
            hostUid: data.hostUid,
            userUid: data.userUid,
            propertyKey: data.propertyKey,
            imageUrl: data.imageUrl,
            price: data.price,
            title: data.title,
            city: data.city,
            address: data.address,
            price: data.price,
            name:data.name
          });
        });
        setListings(items.slice(items.length-3, items.length));
        setTableData(items);
      });
  }, [userUid]);


  useEffect(() => {
    database
      .ref("pendingBookings")
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: childKey,
            arrivalDate: data.arrivalDate,
            departDate: data.departDate,
            guests: data.guests,
            hostUid: data.hostUid,
            userUid: data.userUid,
            propertyKey: data.propertyKey,
            imageUrl: data.imageUrl,
            price: data.price,
            title: data.title,
            city: data.city,
            address: data.address,
            price: data.price,
            name:data.name
          });
        });
        // setListings(items.slice(items.length-3, items.length));
        setPendingBookings(items);
      });
  }, [userUid]);

  useEffect(() => {
    database
      .ref("confirmedBookings")
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: childKey,
            arrivalDate: data?.arrivalDate || '',
            departDate: data?.departDate || '',
            guests: data?.guests || '',
            hostUid: data?.hostUid || '',
            userUid: data?.userUid || '',
            propertyKey: data?.propertyKey || '',
            imageUrl: data?.imageUrl || '',
            price: data?.price || '',
            title: data?.title || '',
            city: data?.city || '',
            address: data?.address || '',
            price: data?.price || '',
            name:data?.name || ''
          });
        });
        // setListings(items.slice(items.length-3, items.length));
        setConfirmedBookings(items);
      });
  }, [userUid]);
  //

  const deleteItem = (key) =>{
//     database.ref("Bookings").child(key).remove()
//   .then(() => console.log(key))
//   .catch((error) => console.error('Error deleting entry:', error));
 console.log(key) 
}


const addItemPendingToConfirmed = (key) => {
 
  let data=pendingBooking?.filter((list)=>list?.key==key)

  console.log(data ,key,'data at 172 inside the add ItemPending')
  console.log(data?.title)

  if(data && data.length){
    database.ref("confirmedBookings").push({
      key: data?.propertyKey || '',
      arrivalDate: data?.arrivalDate || '',
      departDate: data?.departDate || '',
      guests: data?.guests || '',
      hostUid: data?.hostUid || '',
      userUid: data?.userUid || '',
      propertyKey: data?.propertyKey || '',
      imageUrl: data?.imageUrl || '',
      price: data?.price || '',
      title: data?.title || '',
      city: data?.city || '',
      address: data?.address || '',
      price: data?.price || '',
      name:data?.name || ''
      })
  //   .then(() => toast.success('Item updated as Listing successfully'),
  //       database.ref("pendingBookings").child(key).remove())
  // .catch((error) => toast.error('Error deleting entry:', error));
  }
  
};



    return (
        <>
           <AdminNavigationBar/>

    <div className="text-center mt-28">
             <button onClick={()=>setSelectedButton('pendingBooking')} class=" mt-3 mx-2 p-2 focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg ">Pending Bookings</button>
             <button onClick={()=>setSelectedButton('confirmedBooking')} class=" mt-3 mx-2  p-2 focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg ">Confirmed Bookings</button>
             <button onClick={()=>setSelectedButton('allBooking')} class=" mt-3 mx-2 p-2 focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg ">All Bookings</button>
       </div>

           {/* Spinner */}  
    {loading==true ? <div className="sk-cube-grid">
  <div className="sk-cube sk-cube1"></div>
  <div className="sk-cube sk-cube2"></div>
  <div className="sk-cube sk-cube3"></div>
  <div className="sk-cube sk-cube4"></div>
  <div className="sk-cube sk-cube5"></div>
  <div className="sk-cube sk-cube6"></div>
  <div className="sk-cube sk-cube7"></div>
  <div className="sk-cube sk-cube8"></div>
  <div className="sk-cube sk-cube9"></div>
</div> : ""}
       
     
     <Container className='mt-16'>
    
    {selectedButton === 'allBooking' &&        <>
       <h4 className="font-bold text-2xl  uppercase text-green-800" style={{marginTop:"50px", marginLeft:"20px"}}>All Booking</h4>
       <hr className="h-px my-8 bg-green-800 border-2 dark:bg-green-700"/>
       <table class="table" id="myTable">
          <thead>
            <tr>
              <th scope="col">Equipment</th>
              <th scope="col">Title</th>
              <th scope="col">Username</th>
              <th scope="col">Address</th>
              <th scope="col">Starting Date</th>
              <th scope="col">Ending Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>

          {tableData.map((data,id)=>{
            return (        
              <tr>
              <th scope='row'> <Link ><img src={data.imageUrl} width={"100px"} height={"100px"}/></Link> </th>
              <td>{data.title}</td>
              <td>{data?.name ?? "Lakshit Batra"}</td>
              <td>{data.address}&nbsp;,{data.city}</td>
              <td>{data.arrivalDate}</td>
              <td> {data.departDate}</td>
              <td> <center><button onClick={()=>deleteItem(data.propertyKey)} type="button" class=" focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></center> </td> 
            </tr>
            )
       })}

          </tbody>
        </table>
       </>}   

           {selectedButton === 'pendingBooking' &&        <>
       <h4 className="font-bold text-2xl  uppercase text-green-800" style={{marginTop:"50px", marginLeft:"20px"}}>All Booking</h4>
       <hr className="h-px my-8 bg-green-800 border-2 dark:bg-green-700"/>
       <table class="table" id="myTable">
          <thead>
            <tr>
              <th scope="col">Equipment</th>
              <th scope="col">Title</th>
              <th scope="col">Username</th>
              <th scope="col">Address</th>
              <th scope="col">Starting Date</th>
              <th scope="col">Ending Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>

          {pendingBooking.map((data,id)=>{
            return (        
              <tr>
              <th scope='row'> <Link ><img src={data.imageUrl} width={"100px"} height={"100px"}/></Link> </th>
              <td>{data.title}</td>
              <td>{data?.name ?? "Lakshit Batra"}</td>
              <td>{data.address}&nbsp;,{data.city}</td>
              <td>{data.arrivalDate}</td>
              <td> {data.departDate}</td>
              <td> <center><button onClick={()=>addItemPendingToConfirmed(data.key)} type="button" class=" p-2 focus:outline-none text-white bg-blue-500 hover:bg-blue-800">Pending</button></center> </td> 
            </tr>
            )
       })}

          </tbody>
        </table>
       </>} 


       {selectedButton === 'confirmedBooking' &&        <>
       <h4 className="font-bold text-2xl  uppercase text-green-800" style={{marginTop:"50px", marginLeft:"20px"}}>All Booking</h4>
       <hr className="h-px my-8 bg-green-800 border-2 dark:bg-green-700"/>
       <table class="table" id="myTable">
          <thead>
            <tr>
              <th scope="col">Equipment</th>
              <th scope="col">Title</th>
              <th scope="col">Username</th>
              <th scope="col">Address</th>
              <th scope="col">Starting Date</th>
              <th scope="col">Ending Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>

          {confirmedBooking.map((data,id)=>{
            return (        
              <tr>
              <th scope='row'> <Link ><img src={data.imageUrl} width={"100px"} height={"100px"}/></Link> </th>
              <td>{data.title}</td>
              <td>{data?.name ?? "Lakshit Batra"}</td>
              <td>{data.address}&nbsp;,{data.city}</td>
              <td>{data.arrivalDate}</td>
              <td> {data.departDate}</td>
              <td> <center><button type="button" class=" p-2 focus:outline-none text-white bg-green-500 hover:bg-green-800">Confirmed</button></center> </td> 
            </tr>
            )
       })}

          </tbody>
        </table>
       </>}       




     </Container>



        </>
    )
}