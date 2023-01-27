import React,{useState, useEffect} from 'react'
import {Row, Col, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Navbar from '../Components/navbar'
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
import { auth, database } from "../config";

export default function MyBookingsSection() {

    //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [listings, setListings] = useState([]);
  console.log(listings)
   //spinner
   const [loading, setLoading] = useState(true)

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
        console.error(error);
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
          });
        });
        setListings(items);
      });
  }, [userUid]);
  //



    return (
        <>
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
       

       {listingsCheck== true ?  <h2 className="text-center p-2 mt-4">My Bookings</h2> : 
       
       <Container>
      <div className="outer text-center">

       </div>
       </Container>

       }
     
     <Container>
     <h4 className="font-bold text-2xl font-semibold uppercase text-green-800" style={{marginTop:"50px", marginLeft:"20px"}}>All Booking</h4>
     <hr className="h-px my-8 bg-green-800 border-2 dark:bg-green-700"/>
       <Row>
         {listings.map((data, id) => (
          <Col sm={12} md={4} lg={4} key={uuidv4()}>

          <Link to={{ pathname: '/property', search: `?${data.key}`, state: { fromDashboard: true }}}>

          <Card className="mt-4">
               <Card.Img
                 variant="top"
                 src={data.imageUrl}
                 className="my-listings-thumbnail"
               />
               <Card.Body>
                 <Card.Title className="text-dark">{data.title}</Card.Title>
                 <Card.Text className="p-2 text-dark">
                   <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.address}&nbsp;,{data.city}
                   <span className="p-2">
                     <FontAwesomeIcon icon={faRupeeSign} /> {data.price} /Night <br/>
                     <FontAwesomeIcon icon={faCalendar} /> <b>Arrival Date:</b> {data.arrivalDate} <br/>
                     <FontAwesomeIcon icon={faCalendarAlt} /> <b>Departure Date:</b> {data.departDate} <br/>
                   </span>
                   <center><button type="button" class=" mt-3 focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Booked</button></center>
                 </Card.Text>
               </Card.Body>
             </Card>
             </Link>
           </Col>
          
         ))}
       </Row>
     </Container>



        </>
    )
}
