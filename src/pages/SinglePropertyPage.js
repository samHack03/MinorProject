import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/navbar";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Carousel,
  Row,
  Col,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faHome,
  faArrowCircleRight,
  faCheckSquare,
  faTimesCircle,
  faScrewdriverWrench,
  faCalendarDays,
  faIndianRupeeSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { auth, database } from "../config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ReadReviews from "../Components/ReadReviews";

import { BookingContext } from "../context/BookingContext";
import context from "react-bootstrap/esm/AccordionContext";

export default function SinglePropertyPage() {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listings, setListings] = useState([]);
  //Booking form states
  // const [arrivalDate, setArrivalDate] = useState("");
  // const [departDate, setDepartDate] = useState("");
  // const [guests, setGuests] = useState("");
  const [propertyKey, setPropertyKey] = useState("");
  const [hostUid, setHostUid] = useState("");
  const [submit, setSubmit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [heading, setheading] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  //Review form states
  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  const contextBooking = useContext(BookingContext);
  console.log(contextBooking, "in singleProperty");

  // const {setArrivalDate, setDepartDate, setGuests} = contextBooking

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        setAuthState(false);
      } else {
        setAuthState(true);
        setUserUid(user.uid);
        setName(user.displayName);
      }
    });
  }, []);

  //get listing data
  useEffect(() => {
    //Retrive key from URL
    const queryString = window.location.search;
    const RetrivedchildKey = queryString.substring(1);
    setPropertyKey(RetrivedchildKey);

    database
      .ref("properties")
      .child(RetrivedchildKey)
      .once("value", function(snapshot) {
        const items = [];
        console.log(snapshot.val(), "snapshort at 81");
        var val = snapshot.val();
        var hostUid = snapshot.val().userUid;
        var img = snapshot.val().imageOneURL;
        var amount = snapshot.val().per_night;
        var title_head = snapshot.val().title;
        var city_vr = snapshot.val().city;
        var address_vr = snapshot.val().address;
        var livingRoom = snapshot.val().livingRoom;
        var internet = snapshot.val().internet;
        var gym = snapshot.val().gym;
        var parking = snapshot.val().parking;
        var ac = snapshot.val().ac;
        var gatedSecurity = snapshot.val().gatedSecurity;
        var waterSupply = snapshot.val().waterSupply;
        setHostUid(hostUid);
        setImageUrl(img);
        setPrice(amount);
        setheading(title_head);
        setCity(city_vr);
        setAddress(address_vr);
        items.push({
          key: RetrivedchildKey,
          userUid: userUid,
          title: val.title,
          imageOneURL: val.imageOneURL,
          imageTwoURL: val.imageTwoURL,
          imageThreeURL: val.imageThreeURL,
          imageFourURL: val.imageFourURL,
          bedrooms: val.bedrooms,
          bathrooms: val.bathrooms,
          city: val.city,
          address: val.address,
          per_month: val.per_month,
          per_night: val.per_night,
          per_week: val.per_week,
          per_year: val.per_year,
          category: val.category,
          about: val.about,
          name: val.name,

          livingRoom: livingRoom,
          internet: internet,
          gym: gym,
          parking: parking,
          ac: ac,
          gatedSecurity: gatedSecurity,
          waterSupply: waterSupply,
        });
        setListings(items);
      });
  }, [userUid]);
  //

  // const initPayment = (data) => {
  //   const options = {
  //     key: "rzp_test_wfXnqFw2mVZiNE",
  //     amount: price,
  //     currency: data.currency,
  //     name: name,
  //     description: "Test Transaction",
  //     image: imageUrl,
  //     order_id: data.id,
  //     handler: async (response) => {
  //       setSubmit("Submitted");
  //       if (authState) {
  //         database.ref("Bookings").push({
  //           userUid: userUid,
  //           arrivalDate: arrivalDate,
  //           departDate: departDate,
  //           guests: guests,
  //           propertyKey: propertyKey,
  //           hostUid: hostUid,
  //           imageUrl: imageUrl,
  //           price: price,
  //           title: heading,
  //           city: city,
  //           address: address,
  //           name: name,
  //         });

  //         toast.success("Payment Successful !!");
  //         console.log("inside the verify payemnts at 163");
  //       }
  //       try {
  //         const verifyUrl = "http://localhost:8080/api/payment/verify";
  //         const { data } = await axios.post(verifyUrl, response);
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };
  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };

  // const submitBooking = async (e) => {
  //   e.preventDefault();

  //   if (authState) {
  //     try {
  //       const orderUrl = "http://localhost:8080/api/payment/orders";
  //       const { data } = await axios.post(orderUrl, { amount: price });
  //       console.log(price);
  //       console.log(data);
  //       initPayment(data.data);
  //     } catch (error) {
  //       console.log(error, "not able to connect axios");
  //     }
  //   } else {
  //     toast.error("Login first to book any equipment");
  //   }
  // };

  const submitReview = (e) => {
    e.preventDefault();
    database.ref("Reviews").push({
      userUid: userUid,
      propertyKey: propertyKey,
      hostUid: hostUid,
      stars: stars,
      review: review,
      name: name,
    });
    toast("Review has been successfullt posted", { type: "success" });
    document.getElementById("review-form").reset();
  };

  //Option values
  function handleChange(event) {
    setStars(event.target.value);
  }

  //Redirect after form submission
  if (submit === "Submitted") {
    return (
      <>
        <Redirect to="/done-booking" />
      </>
    );
  }

  const addAlert = ()=>{
    toast.error("Login First to Book any equipment !!")
  }

  let startDate = new Date(contextBooking.arrivalDate);
  let endDate = new Date(contextBooking.departDate);
  let diffTime = endDate.getTime() - startDate.getTime();
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + " days");
  contextBooking.setGuests(diffDays);

  return (
    <>
      <Navbar />
      {listings.map((data) => (
        <>
          <div className="caraousel-slider mr-top-slider">
            <Container>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageOneURL}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageTwoURL}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageThreeURL}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageFourURL}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Container>
          </div>

          <Container>
            <Row className="mt-5">
              <Col lg={8} md={8} sm={12}>
                <Card>
                  <h4 className="pl-2 pt-2">{data.title}</h4>
                  <p className={"text-lead pl-2"}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city},
                    {data.address}&nbsp;&nbsp;
                    <span></span>
                    <FontAwesomeIcon
                      icon={faScrewdriverWrench}
                      style={{ marginLeft: "20px" }}
                    />{" "}
                    {data.category == "Personal Rooms"
                      ? "Heavy Machinery"
                      : data.category == "Family Apartments"
                      ? "Light-Weight Tools"
                      : "Daily-Use Tools"}
                  </p>

                  <Row className="p-2">
                    <Col lg={4} md={4} sm={4}>
                      <Card className="mt-2">
                        <Card.Body>
                          <FontAwesomeIcon icon={faScrewdriverWrench} />{" "}
                          {data.category == "Personal Rooms"
                            ? "Heavy Machinery"
                            : data.category == "Family Apartments"
                            ? "Light-Weight Tools"
                            : "Daily-Use Tools"}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="mt-2">
                      <Card>
                        <Card.Body>
                          <FontAwesomeIcon icon={faClock} /> Purchasing year:
                          {data.bedrooms}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="mt-2">
                      <Card>
                        <Card.Body>
                          <FontAwesomeIcon icon={faCalendarDays} /> Usage
                          duration:
                          {data.bathrooms}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Container>
                    <h4 className="mt-4">About this Equipment</h4>
                    <p className="text-lead">{data.about}</p>
                    <h4 className="mt-4">Prices</h4>
                    <Row>
                      <Col sm={12} lg={3} md={3}>
                        <p className="text-lead">
                          <FontAwesomeIcon icon={faArrowCircleRight} /> Per Day:{" "}
                          {data.per_night}
                        </p>
                      </Col>
                      <Col sm={12} lg={3} md={3}>
                        <p className="text-lead">
                          <FontAwesomeIcon icon={faArrowCircleRight} /> Per
                          Week: {data.per_week}
                        </p>
                      </Col>
                      <Col sm={12} lg={3} md={3}>
                        <p className="text-lead">
                          {" "}
                          <FontAwesomeIcon icon={faArrowCircleRight} /> Per
                          Month: {data.per_month}
                        </p>
                      </Col>
                      <Col sm={12} lg={3} md={3}>
                        <p className="text-lead">
                          <FontAwesomeIcon icon={faArrowCircleRight} /> Per
                          Year: {data.per_year}
                        </p>
                      </Col>
                    </Row>

                    <h4 className="mt-4">Other Details</h4>
                    <Row>
                      <Col sm={15} lg={4} md={4}>
                        <p className="text-lead">
                          Electric Equipment:&nbsp;
                          {data.livingRoom == "Yes" ? (
                            <FontAwesomeIcon icon={faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} />
                          )}
                        </p>
                      </Col>
                      <Col sm={15} lg={4} md={4}>
                        <p className="text-lead">
                          Uasge for large area:&nbsp;
                          {data.internet == "Yes" ? (
                            <FontAwesomeIcon icon={faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} />
                          )}
                        </p>
                      </Col>
                      <Col sm={15} lg={4} md={4}>
                        <p className="text-lead">
                          Life of Equipment:&nbsp;
                          {data.gym == "Yes" ? (
                            <FontAwesomeIcon icon={faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} />
                          )}
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={15} lg={4} md={4}>
                        <p className="text-lead">
                          Weight(More than 100kg):&nbsp;
                          {data.gatedSecurity == "Yes" ? (
                            <FontAwesomeIcon icon={faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} />
                          )}
                        </p>
                      </Col>

                      <Col sm={15} lg={4} md={4}>
                        <p className="text-lead">
                          Indian Manufacture: &nbsp;
                          {data.waterSupply == "Yes" ? (
                            <FontAwesomeIcon icon={faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} />
                          )}
                        </p>
                      </Col>

                      <Col sm={15} lg={4} md={4}>
                        <p className="text-lead">
                          Aadhar Linked : &nbsp;
                          {data.ac == "Yes" ? (
                            <FontAwesomeIcon icon={faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} />
                          )}
                        </p>
                      </Col>

                      <Col sm={15} lg={4} md={4}>
                        <p className="text-lead">
                          KYC:&nbsp;
                          {data.parking == "Yes" ? (
                            <FontAwesomeIcon icon={faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={faTimesCircle} />
                          )}
                        </p>
                      </Col>
                    </Row>

                    {/*TODO*/}
                    {/* <iframe
                      className="my-3"
                      width="100%"
                      height="300"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed&amp;q=delhi"
                    ></iframe> */}

                    <hr />

                    <Form onSubmit={submitReview} id="review-form">
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg={8}
                          md={8}
                          sm={12}
                          controlId="formBasicText"
                        >
                          <Form.Label>Write Your Review</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Write here..."
                            required
                            onChange={(e) => setReview(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg={4}
                          md={4}
                          sm={12}
                          controlId="formBasicText"
                        >
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            name="category"
                            onChange={handleChange}
                          >
                            <option>Select</option>
                            <option value="5">5 Star</option>
                            <option value="4">4 Star</option>
                            <option value="3">3 Star</option>
                            <option value="2">2 Star</option>
                            <option value="1">1 Star</option>
                          </Form.Control>
                        </Form.Group>
                      </Form.Row>

                      <Button variant="success" type="submit">
                        Post Review
                      </Button>
                    </Form>

                    <hr />
                    <ReadReviews />
                    <br />
                  </Container>
                </Card>
              </Col>

              <Col lg={4} md={4} sm={12}>
                <Card className="text-center booking-form ml-2">
                  <Card.Header className="card-booking-form-header">
                    ₹ {data.per_night}/Night
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Arrival Date</Form.Label>
                        <Form.Control
                          type="date"
                          required
                          onChange={(e) =>
                            contextBooking.setArrivalDate(e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Depart Date</Form.Label>
                        <Form.Control
                          type="date"
                          required
                          onChange={(e) =>
                            contextBooking.setDepartDate(e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>
                          <b>{"Total days required : "}</b>
                        </Form.Label>
                        {"  "} {diffDays ? diffDays : " 0"}
                      </Form.Group>
                      {/* TODO Booking button */}
                      {/* {userUid==hostUid? "" : ""} */}
                      <center>
                        {authState ? (
                          <Link
                            variant="primary"
                            className="btn-block bg-green-600 text-white "
                            type="submit"
                            to={{
                              pathname: "/booking-details",
                              search: `?${propertyKey}`,
                              state: { fromDashboard: true },
                            }}
                            style={{
                              borderRadius: "20px",
                              width: "40%",
                              padding: "10px",
                            }}
                          >
                            Book Now
                          </Link>
                        ) : (
                          <button
                            style={{
                              borderRadius: "20px",
                              width: "40%",
                              padding: "10px",
                            }}
                            variant="primary"
                            className="btn-block bg-green-600 text-white "
                            onClick={addAlert}
                          >
                            Book Now
                          </button>
                        )}
                      </center>
                    </Form>
                  </Card.Body>

                  {/* TODO: */}

                  <Card.Footer className="text-muted">
                    <Link to={`/find-roommates?${data.city}Yes`}>
                      <Button variant="warning">
                        Contact owner in {data.city}
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
          <br />
          <br />
          <br />
        </>
      ))}
    </>
  );
}
