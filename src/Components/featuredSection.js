import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  handleClose,
  show,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faRupeeSign,
  faCalendarDays,
  faIndianRupeeSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { auth, database } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwiperCrousel from "./Swiper/Swiper";

export default function MyListings() {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [listings, setListings] = useState([]);
  //spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
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
          {
            setLoading(false);
          }
        } else {
          setListingsCheck(false);
          {
            setLoading(false);
          }
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
      .ref("properties")
      .limitToLast(3)
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
            per_week: data.per_week,
          });
        });
        setListings(items);
      });
  }, [userUid]);
  //

  return (
    <>
      {/* Spinner */}
      {loading == true ? (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      ) : (
        ""
      )}

      <div className="featured-section">
        {listingsCheck == true ? (
          <h2 className="text-center p-2 mt-4" style={{ color: "black" }}>
            Featured Equipment
          </h2>
        ) : (
          ""
        )}

        <Container>
          <Row>
            {listings.map((data, id) => (
              <Col sm={12} md={4} lg={4} key={uuidv4()}>
                <Link
                  to={{
                    pathname: "/property",
                    search: `?${data.key}`,
                    state: { fromDashboard: true },
                  }}
                >
                  <Card className="mt-4">
                    <Card.Img
                      variant="top"
                      src={data.imageOneURL}
                      className="my-listings-thumbnail"
                    />
                    <Card.Body>
                      <Card.Title className="text-dark">
                        {data.title}
                      </Card.Title>
                      <Card.Text className="p-2 text-dark">
                        <FontAwesomeIcon icon={faClock} /> {data.bedrooms}
                        &nbsp;&nbsp;
                        <FontAwesomeIcon icon={faCalendarDays} />{" "}
                        {data.bathrooms}&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}
                        &nbsp;&nbsp;
                        {/* <span className="p-2"> */}
                        <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                        {data.per_week}
                        {/* </span> */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className="mx-24 w-3.4 flex justify-center ml-32 my-8 border-4 border-gray-200">
        <SwiperCrousel />
      </div>
      <br />
      <br />
    </>
  );
}
