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
  Nav,
} from "react-bootstrap";
import Navbar from "../Components/navbar";
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
import Footer from "../Components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Components/sidebar/sidebar";

export default function FamilyApartments() {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [heavyMachine, setHeavyMachine] = useState([]);
  const [mediumTools, setMediumTools] = useState([]);
  const [smallTools, setSmallTools] = useState([]);
  //spinner
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

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
      .orderByChild("category")
      .equalTo("Personal Rooms")
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
            name: data.name,
          });
        });
        setHeavyMachine(items.splice(0, 3));
      });
  }, [userUid]);

  useEffect(() => {
    database
      .ref("properties")
      .orderByChild("category")
      .equalTo("Family Apartments")
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
            name: data.name,
          });
        });
        setMediumTools(items.splice(0, 3));
      });
  }, [userUid]);

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
            name: data.name,
          });
        });
        setSmallTools(items.splice(0, 3));
      });
  }, [userUid]);
  //

  function checkIfValueExists(id) {
    const items = [];
    database
      ?.ref("Bookings")
      ?.orderByChild("propertyKey")
      ?.equalTo(id)
      ?.on("value", (snapshot) => {
        snapshot?.forEach((childSnapshot) => {
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
            name: data.name,
          });
        });
      });
     console.log(items.length)
    return items.length;
  }

  return (
    <>
      <Navbar />

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

      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "50px" }}>
          <Sidebar />
        </div>
        <div style={{ marginLeft: "50px" }}>
          <Container>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h4
                className="font-bold text-2xl font-semibold uppercase text-green-800"
                style={{ marginTop: "150px", marginLeft: "20px" }}
              >
                Heavy Machinery
              </h4>
              <Link
                to="/heavy-machinery"
                class="text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                style={{ marginTop: "150px" }}
              >
                View More
              </Link>
              {/* <button type="button" >Green</button> */}
            </div>

            <hr className="h-px my-8 bg-green-800 border-2 dark:bg-green-700" />

            <Row>
              {heavyMachine.map((data, id) => (
                <Col sm={12} md={4} lg={4} key={uuidv4()}>
                  <Link
                    to={{
                      pathname: "/property",
                      search: `?${data.key}`,
                      state: { fromDashboard: true },
                    }}
                  >
                    <Card className="all-properties">
                      <Card.Img
                        variant="top"
                        src={data.imageOneURL}
                        className="my-listings-thumbnail"
                      />
                      <Card.Body>
                        <Card.Title className="text-dark">
                          {data.title}
                        </Card.Title>
                        <div className="flex justify-between">
                          <p>{data.name}</p>{" "}
                          {checkIfValueExists(data.key) > 0 && (
                            <button className="bg-red-500 rounded-md p-2 text-white">
                              Booked
                            </button>
                          )}
                        </div>
                        <Card.Text className="p-2 text-dark">
                          <FontAwesomeIcon icon={faClock} /> {data.bedrooms}
                          &nbsp;
                          <FontAwesomeIcon icon={faCalendarDays} />{" "}
                          {data.bathrooms}&nbsp;
                          <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}
                          &nbsp;
                          <span className="p-2">
                            <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                            {data.per_month}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>

          <Container>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h4
                className="font-bold text-2xl font-semibold uppercase text-green-800"
                style={{ marginTop: "50px", marginLeft: "20px" }}
              >
                Light-Weight Tools
              </h4>
              <Link
                to="/light-weight-tools"
                class="text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                style={{ marginTop: "50px" }}
              >
                View More
              </Link>
            </div>
            <hr className="h-px my-8 bg-green-800 border-2 dark:bg-green-700" />
            <Row>
              {mediumTools.map((data, id) => (
                <Col sm={12} md={4} lg={4} key={uuidv4()}>
                  <Link
                    to={{
                      pathname: "/property",
                      search: `?${data.key}`,
                      state: { fromDashboard: true },
                    }}
                  >
                    <Card className="all-properties">
                      <Card.Img
                        variant="top"
                        src={data.imageOneURL}
                        className="my-listings-thumbnail"
                      />
                      <Card.Body>
                        <Card.Title className="text-dark">
                          {data.title}
                        </Card.Title>
                        <div className="flex justify-between">
                          <p>{data.name}</p>{" "}
                          {checkIfValueExists(data.key) > 0 && (
                            <button className="bg-red-500 rounded-md p-2 text-white">
                              Booked
                            </button>
                          )}
                        </div>
                        <Card.Text className="p-2 text-dark">
                          <FontAwesomeIcon icon={faClock} /> {data.bedrooms}
                          &nbsp;
                          <FontAwesomeIcon icon={faCalendarDays} />{" "}
                          {data.bathrooms}&nbsp;
                          <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}
                          &nbsp;
                          <span className="p-2">
                            <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                            {data.per_month}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>

          <Container>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h4
                className="font-bold text-2xl font-semibold uppercase text-green-800"
                style={{ marginTop: "50px", marginLeft: "20px" }}
              >
                Daily-Use Tools
              </h4>
              <Link
                to="/daily-use-tools"
                class="text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                style={{ marginTop: "50px" }}
              >
                View More
              </Link>
              {/* <button type="button" >Green</button> */}
            </div>

            <hr className="h-px my-8 bg-green-800 border-2 dark:bg-green-700" />

            <Row>
              {smallTools.map((data, id) => (
                <Col sm={12} md={4} lg={4} key={uuidv4()}>
                  <Link
                    to={{
                      pathname: "/property",
                      search: `?${data.key}`,
                      state: { fromDashboard: true },
                    }}
                  >
                    <Card className="all-properties">
                      <Card.Img
                        variant="top"
                        src={data.imageOneURL}
                        className="my-listings-thumbnail"
                        width={"100"}
                        height={"100"}
                      />
                      <Card.Body>
                        <Card.Title className="text-dark">
                          {data.title}
                        </Card.Title>
                        <div className="flex justify-between">
                          <p>{data.name}</p>{" "}
                          {checkIfValueExists(data.key) > 0 && (
                            <button className="bg-red-500 rounded-md p-2 text-white">
                              Booked
                            </button>
                          )}
                        </div>{" "}
                        <Card.Text className="p-2 text-dark">
                          <FontAwesomeIcon icon={faClock} /> {data.bedrooms}
                          &nbsp;
                          <FontAwesomeIcon icon={faCalendarDays} />{" "}
                          {data.bathrooms}&nbsp;
                          <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}
                          &nbsp;
                          <span className="p-2">
                            <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                            {data.per_month}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      <br />
      <br />
      <Footer />
    </>
  );
}
