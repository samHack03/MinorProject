import React, { useState, useContext } from "react";
import {Link} from "react-router-dom"
import "./Banner.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import home1 from "../../img/img/home1.jpg"
import {UserContext} from '../../context/UserContext'
// import slider2 from "../../../img/slider2.webp";
// import slider3 from "../../../img/slider3.webp";
// import { useNavigate, Navigate } from "react-router-dom";
// import SpeechRecognition, {
//   useSpeechRecognition
// } from "react-speech-recognition";

const Banner = () => {
  // const navigate = useNavigate();
  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage)
    }
  ];

  const context = useContext(UserContext);

  // const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = [
    "home",
    "dashboard",
    "booking",
    "contact",
    "profile",
    "feedback",
    "login",
    "register",
    "booking history",
    "partner dispute",
    "cancellation policy"
  ];
  const urls = {
    home: "/",
    dashboard: "/dashboard",
    booking: "/booking",
    contact: "/contact",
    feedback: "/feedback",
    login: "/login",
    register: "/register",
    "booking history": "/booking-history",
    "partner dispute": "/partner-dispute",
    "cancellation policy": "/policy"
  };

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }


  let redirect = "";

  // if (redirectUrl) {
  //   if (pages.includes(redirectUrl)) {
  //     redirect = <Navigate replace to={urls[redirectUrl]} />;
  //     // setRedirectUrl('');
  //   } else {
  //     redirect = <p>Could not find page: {redirectUrl}</p>;
  //     // setRedirectUrl('');
  //   }
  // }
  return (
    <>
      {redirect}
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div className="relative">
          <div className="absolute w-full h-full bg-gradient-to-r from-green-600/10 to-green-600/10 bottom-0  z-20" />
          <img src={home1} className="home1Img" />
          <div>
            <div className="flex flex-col justify-center -mt-10 wrapper">
              <p className="text-2xl font-normal text-white">
              नमस्ते {context?.user?.email?.split("@")[0]?.toUpperCase()}, welcome to Krish-e-Hal.
              </p>
              <h1 className="text-4xl font-bold text-white">
                <span className="text-[#219653]">Farmer’s Eqipments</span> at
                reasonable <br /> and affordable prices.
              </h1>
              <p className="text-lg font-normal mt-2 mb-4 text-white">
                Start now with just one click.
                <br/>
                <br/>
                <Link to="/dashboard" class="mt-4 text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900" style={{marginTop:"30px", marginLeft:"20px"}}>Book Now</Link>
              </p>
              <div className="flex justify-center items-center mx-auto">

                {/* <Link to="/daily-use-tools" className="bg-[#219653] bg-white border-2 transition border-[#219653] text-[#219653] hover:text-white font-bold py-1 px-8 rounded mx-2">Book Now</Link> */}
                <i
                  // onClick={SpeechRecognition.startListening}
                  className="text-darkgreen tooltip cursor-pointer text-2xl mr-5 fa-solid fa-microphone"
                >
                  <span className="tooltiptext">Search by Voice</span>
                </i>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <img src={slider2} />
        </div>
        <div>
          <img src={slider3} />
        </div> */}
      </Carousel>
    </>
  );
};

export default Banner;
