import React from "react";
import "./Footer.css";
import { useNavigate,Link } from "react-router-dom";
import logo1 from "../../img//logo1.png";
import Vector from "../../img//Vector.png";
import Vector1 from "../../img//Vector1.png";
import Vector2 from "../../img//Vector2.png";
import footerBg from "../../img//footerBg.png";

const Footer = () => {
  // const navigate = useNavigate();
  return (
    <div className="bg-[#219653] inPhone py-20">
      <div className="flex justify-center items-center">
        <div className="flex-1 border-r-2 border-black-600">
          <div
            className="flex justify-center items-center mx-8 cursor-pointer"
            // onClick={() => navigate("/")}
          >
            <img src={logo1} className="footerLogo" alt="" />
            <div className="ml-4">
              <h3 className="text-2xl text-white font-bold mt-4">
                Krish <br /> e-Hal
              </h3>
              <p className="text-md font-normal text-white mt-2">
                Kisaan upkaran ka ek Matra Sadhan.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <div className="flex">
            <ul className="list-none mr-24">
              <li
                className="text-lg text-white font-bold cursor-pointer"
              >
                <Link className="text-lg text-white font-bold cursor-pointer" to="/">Home</Link>
              </li>
              
              {/* <li className='text-lg text-white font-medium cursor-pointer'>Menu</li> */}
              <li className="text-lg text-white font-medium cursor-pointer">
              <Link className="text-lg text-white font-bold cursor-pointer" to="/">Market</Link>
              </li>
            </ul>
            <ul>
              <li
                className="text-lg text-white font-bold cursor-pointer"
                // onClick={() => navigate("/support-center")}
              >
                Support Center
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
                              >
                <Link className="text-lg text-white font-bold cursor-pointer" to="/help">Help Center</Link>
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
                // onClick={() => navigate("/partner-dispute")}
              >
                 <Link className="text-lg text-white font-bold cursor-pointer" to="/partner-dispute">Partner Dispute</Link>
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
                // onClick={() => navigate("faq")}
              >
                 <Link className="text-lg text-white font-bold cursor-pointer" to="/faq">FAQs</Link>
              </li>
            </ul>
          </div>
          <p className="text-md text-medium text-white mt-4">
            Please provide us Feedback{" "}
            <button
              // onClick={() => navigate("/feedback")}
              className="text-xl underline"
            >
               <Link className="text-lg text-white font-bold cursor-pointer" to="/feedback">HERE</Link>
            </button>
          </p>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <h1 className="text-xl ml-6 text-white font-bold w-2/3">
            Give us a follow on social media
          </h1>
          <div className="flex my-5 justify-left">
            <img
              className="socialIcons mx-3 ml-6 cursor-pointer"
              src={Vector}
              alt=""
            />
            <img
              className="socialIcons mx-3 ml-6 cursor-pointer"
              src={Vector1}
              alt=""
            />
            <img
              className="socialIcons mx-3 ml-6 cursor-pointer"
              src={Vector2}
              alt=""
            />
          </div>
          <p className="text-lg ml-6 text-white">
            Made by : <strong>By SRK2</strong>
          </p>
        </div>
        <div className="flex-1 flex mr-6">
          <img src={footerBg} className="footerBgImg" alt="" />
          <h1 className="text-xl text-white font-bold mt-6">
            Ministry of Skill Development and Entrepreneurship
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
