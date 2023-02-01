import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import Footer from "../Components/footer/Footer";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  handleClose,
  show,
  Nav,
} from "react-bootstrap";
import Navbar from '../Components/navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faRupeeSign,
  faCalendarDays,
  faIndianRupeeSign,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { auth, database } from "../config";

export default function VacationVillas() {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [listings, setListings] = useState([]);
   //spinner
   const [loading, setLoading] = useState(true)
   const [query,setQuery] = useState("");

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
      .ref("properties")
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
      .ref("properties")
      .orderByChild("category")
      .equalTo("Villas For Vacation")
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: childKey,
            title: data.title,
            imageOneURL: data.imageOneURL,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            city: data.city,
            per_month: data.per_month,
            per_week:data.per_week,
            name:data.name
          });
        });
        setListings(items);
      });
  }, [userUid]);
  //

  // useEffect(()=>{
  
  //   if(query!=""&&authState&&listings?.length()>0){
  //     const tngCharacters = listings?.filter(character => {
  //       return character.name.includes(query);
  //     });
  //     setListings(tngCharacters);
  //   }
 

  // },[query])

  return (
    <>
    <Navbar/>

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

     
      <Container>
  

 

        {/* <input onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search any equipment" className="mt-32 border full-rounded " style={{width:'80%', padding:"5px", height:"40px"}} /> */}
      
        <h4 className="font-bold text-2xl font-semibold uppercase text-green-800" style={{marginTop:"150px", marginLeft:"20px"}}>Daily-Use Tools</h4>
        <hr className="h-px  bg-green-800 border-2 dark:bg-green-700"/>
        <Row className="mt-28 mb-8" >
          {listings.map((data, id) => (
           <Col sm={12} md={4} lg={4} key={uuidv4()}>

           <Link to={{ pathname: '/property', search: `?${data.key}`, state: { fromDashboard: true }}}>

           <Card className="all-properties">
                <Card.Img
                  variant="top"
                  src={data.imageOneURL}
                  className="my-listings-thumbnail"
                />
                <Card.Body>
                  <Card.Title className="text-dark">{data.title}</Card.Title>
                  <p>{data.name}</p>
                  <Card.Text className="p-2 text-dark">
                    <FontAwesomeIcon icon={  faClock} />  {data.bedrooms}&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCalendarDays} /> {data.bathrooms}&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}&nbsp;&nbsp;
                    <span className="p-2">
                      <FontAwesomeIcon icon={faIndianRupeeSign} /> {data.per_week}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
              </Link>
            </Col>
           
          ))}
        </Row>
    

    


      </Container>
      <Footer/>
      <br />
      <br />
    </>
  );
}
