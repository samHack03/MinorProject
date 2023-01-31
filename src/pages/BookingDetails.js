import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import { auth, database } from ".././config";
import { toast } from "react-toastify";
import Navbar from "../Components/navbar";

import logo from '../img/logo1.png'

import { BookingContext } from "../context/BookingContext";

import Footer from "../Components/footer/Footer"

import axios from "axios";

const BookingRequest = () => {
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listings, setListings] = useState([]);
  //Booking form states
//   const [arrivalDate, setArrivalDate] = useState("");
//   const [departDate, setDepartDate] = useState("");
//   const [guests, setGuests] = useState("");
  const [propertyKey, setPropertyKey] = useState("");
  const [hostUid, setHostUid] = useState("");
  const [submit, setSubmit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [heading, setheading] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [title,setTitle] = useState("");
  //Review form states
  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category,setCategory] = useState("");


  const contextBooking = useContext(BookingContext);

  console.log(contextBooking,"contextBooking at 36")


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
        setTitle(val.title);
        setEmail(val.email)
        setCategory(val.category);
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
          email:val.email,

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

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_wfXnqFw2mVZiNE",
      amount: price,
      currency: data.currency,
      name: name,
      description: "Test Transaction",
      image: imageUrl,
      order_id: data.id,
      handler: async (response) => {
        setSubmit("Submitted");
        if (authState) {
          database.ref("Bookings").push({
            userUid: userUid,
            arrivalDate: contextBooking?.arrivalDate,
            departDate: contextBooking?.departDate,
            guests: contextBooking?.guests,
            propertyKey: propertyKey,
            hostUid: hostUid,
            imageUrl: imageUrl,
            price: price,
            title: heading,
            city: city,
            address: address,
            name: name,
          });

          toast.success("Payment Successful !!");
          console.log("inside the verify payemnts at 163");
        }
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    if (authState) {
      try {
        const orderUrl = "http://localhost:8080/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: price*contextBooking.guests });
        console.log(price);
        console.log(data);
        initPayment(data.data);
      } catch (error) {
        console.log(error, "not able to connect axios");
      }
    } else {
      toast.error("Login first to book any equipment");
    }
  };

  const [checkoutData, setCheckoutData] = useState({
    date: "",
    equipmentName: "",
    bookingId: "",
    manufacturer: "",
    ownerName: "",
    email: "",
    address: "",
    fromDate: "",
    toDate: "",
    amount: "",
    subtotal: "",
  });

  

  let current = new Date();
  let cDate = current.getDate() + "-" + (current.getMonth() + 1) + "-" + current.getFullYear();
  
  let total =price*contextBooking.guests;

  if (submit === "Submitted") {
    return (
      <>
        <Redirect to="/done-booking" />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex relative bg-white-800 mt-44 mb-8" style={{background:"green", width:"60%"}}>
                <h1 className="absolute top-0 left-24 font-semibold text-green-600 text-2xl ">
                  Booking Details
                </h1>
                <p className="absolute top-0 right-24 text-[#68AC5D] font-semibold text-md">
                  <i className="pr-2 fa-solid fa-arrow-left-long"></i>{" "}
                  <Link  to={{ pathname: '/property', search: `?${propertyKey}`, state: { fromDashboard: true }}} className="text-green-600"  >Back</Link>
                </p>
              </div>

      <div className=" bg-gray-100">
        <div className="max-w-7xl mt-8 mx-auto innerWrapper">
          <div  style={{display:"flex", flexDirection:"row"}}>
            <div style={{width:"75%"}} >


              <div className="flex flex-col border-b-2 pb-6">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="border-b bg-gray-100 h-2">
                          <tr>
                            <th
                              scope="col"
                              className="text-center text-gray-600 text-md px-6 py-4 font-bold"
                            >
                            Date
                            </th>
                            <th
                              className="text-gray-600 text-md  px-6 py-4 text-center font-bold "
                              scope="col"
                            >
                              Booking Id
                            </th>
                            <th
                              scope="col"
                              className="text-gray-600 text-md  px-6 py-4 text-center font-bold"
                            >
                              Equipment
                            </th>
                            <th
                              scope="col"
                              className="text-gray-600 text-md  px-6 py-4 text-center font-bold"
                            >
                              Category
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white py-6">
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                            {cDate}
                            </td>
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                              {userUid}
                            </td>
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                              {title}
                            </td>
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                            {category == "Personal Rooms"
                      ? "Heavy Machinery"
                      : category == "Family Apartments"
                      ? "Medium Tools"
                      : "Small Tools"}
                            </td>
                            {/* <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                              <span
                                style={{
                                  height: "12px",
                                  width: "12px",
                                  background: "#FFD233",
                                }}
                              ></span>{" "}
                              Pending
                            </td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="border-b bg-gray-100 h-2">
                          <tr>
                            <th
                              scope="col"
                              className="text-center text-gray-600 text-md font-bold px-6 py-4"
                            >
                              Owner Name
                            </th>
                            <th
                              className="text-gray-600 text-md font-bold px-6 py-4 text-center"
                              scope="col"
                            >
                              Owner Email
                            </th>
                            <th
                              scope="col"
                              className="text-gray-600 text-md font-bold px-6 py-4 text-center"
                            >
                              Owner City
                            </th>
                            {/* <th
                              scope="col"
                              className="text-gray-600 text-md font-medium px-6 py-4 text-center"
                            >
                              Manufacturer
                            </th>
                            <th
                              scope="col"
                              className="text-gray-600 text-md font-medium px-6 py-4 text-center"
                            >
                              Request status
                            </th>
                            <th
                              scope="col"
                              className="text-gray-600 text-md font-medium px-6 py-4 text-center"
                            >
                              From/To Date
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white py-6">
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                             {name}
                            </td>
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                              {email}
                            </td>
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                             {city}
                            </td>
                            {/* <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                              Parth Sharma
                            </td>
                            <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                              <span
                                style={{
                                  height: "12px",
                                  width: "12px",
                                  background: "#FFD233",
                                }}
                              ></span>{" "}
                              Pending
                            </td> */}
                            {/* <td className="text-gray-600 font-normal text-center text-md px-6 py-4 whitespace-nowrap">
                              {contextBooking?.arrivalDate} - {contextBooking?.departDate}
                            </td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{width:"40%"}}>
              <div className="flex justify-around my-2">
                <div style={{width:'100%', marginLeft:"60px"}} className="border-2 rounded-3xl p-5 w-1/5 bg-white">
                  <h1 className="text-md text-gray-500 " >
                    Rent Details
                  </h1>

                  <div style={{border:"1px dotted gray"}}>
 
                  </div>
                  
                  <div className="flex justify-between my-3">
                    <p className="text-sm font-bold text-[#4F4F4F]">From</p>
                    <p className="text-sm font-normal text-[#4F4F4F]">
                      {contextBooking.arrivalDate}
                    </p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="text-sm font-bold text-[#4F4F4F]">
                      To
                    </p>
                    <p className="text-sm font-normal text-[#4F4F4F]">{contextBooking.departDate}</p>
                  </div>

                  <div style={{border:"1px dotted gray"}}>

                  </div>

         

                  <div className="flex justify-between my-3">
                    <p className="text-sm font-bold text-[#4F4F4F]">Total</p>
                    <p className="text-sm font-normal text-[#4F4F4F]">
                      Rs {price} / day
                    </p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="text-sm font-bold text-[#4F4F4F]">
                      No. of days
                    </p>
                    <p className="text-sm font-normal text-[#4F4F4F]">{contextBooking.guests}</p>
                  </div>
                  <div style={{border:"1px dotted gray"}}>
 
                    </div>
                  <div className="flex justify-between mt-2">



                    <p className="text-md font-bold text-gray-600">Sub Total</p>
                    <p className="text-md font-bold text-[#68AC5D]">
                      {total}{" "}
                    </p>
                  </div>
                </div>
              </div>


            <center>  
                {/* <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"  >Book Now</button>    */}
            <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2 ml-16" onClick={submitBooking} style={{borderRadius:"50px", border:"2px solid"}} >
            <img src={logo} width={"40px"} height={"40px"}/>
  Proceed to Payment
</button>
            </center> 
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default BookingRequest;
