import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import Navbar from '../Components/navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { auth, database } from "../config";

export default function PublicProfiles() {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [profilesCheck, setProfilesCheck] = useState(null);
  //snapshots
  const [profiles, setProfiles] = useState([]);
   //spinner
   const [loading, setLoading] = useState(true)

   const [filterQuery, setFilterQuery] = useState("")
   console.log(filterQuery)

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

    const queryString = window.location.search;
    const RetrivedchildKey = queryString.substring(1);
    setFilterQuery(RetrivedchildKey);


    database
      .ref("properties")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setProfilesCheck(true);
          {setLoading(false)}
        } else {
          setProfilesCheck(false);
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
    // database
    //   .ref("My-Profile")
    //   .orderByChild("filter")
    //   .equalTo(filterQuery)
    //   .on("value", (snapshot) => {
    //     const items = [];
    //     snapshot.forEach((childSnapshot) => {
    //       var childKey = childSnapshot.key;
    //       var data = childSnapshot.val();
    //       items.push({
    //         name: data.name,           
    //         city: data.city,
    //         thumbnail: data.thumbnail,
    //         homeSearch: data.homeSearch,
    //         email: data.email,
           
    //       });
    //     });
    //     setProfiles(items);
    //     console.log(items, "items at 87")
    //   });


      database
      .ref("My-Profile")
      .orderByChild("city")
      .equalTo(filterQuery.split("Y")[0])
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            name: data.name,           
            city: data.city,
            thumbnail: data.thumbnail,
            homeSearch: data.homeSearch,
            email: data.email,
           
          });
        });
        setProfiles(items);
        console.log(items, "items at 87")
      });


  }, [userUid]);
  //

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

    <div className="mt-32">
    <Container>
        <Row>
          {profiles.map((data, id) => (
           <Col sm={12} md={4} lg={4} key={uuidv4()}>
           <Card className="all-properties">
                <Card.Img
                  variant="top"
                  src={data.thumbnail}
                  className="my-listings-thumbnail"
                />
                <Card.Body>
                  <Card.Title className="text-dark">{data.name}</Card.Title>
                  <Card.Text className="text-dark">
                  <p>
                      {data.homeSearch == "Yes" ? "I'm Searching for farming equipment": ""}
                    </p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}&nbsp;
                   <p className="pt-2">
                   <a href={`mailto:${data.email}`} ><FontAwesomeIcon icon={faEnvelope} />&nbsp;{data.email}</a>
                   </p>
                   <center>
                   <button type="button" class="text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">Chat</button>
                   </center>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
           
          ))}
        </Row>
      </Container>

    </div>
     

      <br />
      <br />
    </>
  );
}
