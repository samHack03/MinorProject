import React from 'react';
import {Link} from "react-router-dom"
import "./Ads.css";

const Ads = () => {
  return (
    <div className="h-1/2 py-4 bg-green-100 bg-grey" >
      <div className="">
        <div className="flex justify-center flex-col">
          <h1 className="mx-auto tracking-wide text-4xl font-bold uppercase opacity-[0.7]">
            Get Started
          </h1>
          <p className="mx-48 leading-7 tracking-wide my-6 text-md font-medium">
            We open the door to thousands of farmers. Rent your equipment for
            the off-season, and create an advertisement on our platform. Through
            our rigorous customer compliance, we make sure that only reliable
            users gain access to our digital marketplace.{" "}
            <span className="text-darkgreen">
              There are two ways to get started
            </span>
            :
          </p>
        </div>

        <div className="flex justify-center makeCol items-center mx-28 mt-6">
          <div className="w-11/12 mr-16 pr-24 border-r-2 border-black-600">
            <h1 className="text-xl text-center font-bold opacity-[0.7] mb-5">
              Post ads as an Owner*
            </h1>
            <p className="text-md font-medium mb-4">
              As an owner, start posting rent offers for the agricultural
              equipments by providing available timeline to the buyers/customers
              and get rapid reactions from nearby interested customers.
            </p>
            <div className="flex justify-center">
              <p className="text-sm text-darkgreen font-medium">
               <Link to="/post-advertisement"><button className="bg-blue-500 text-white p-2 rounded-md w-[150px]">Post Advertisement</button></Link>
              </p>
            </div>
          </div>

          <div className="w-11/12">
            <h1 className="text-xl text-center font-bold opacity-[0.7] mb-5 ">
              Book as a Customer*
            </h1>
            <p className="text-md font-medium mb-4">
              As a customer, start exploring and filter the various agri-
              cultural equipments for you. Communicate with the owner for
              negotiation/offers, and book great deals while experiencing
              satisfaction.
            </p>
            <div className="flex justify-center">
              <p className="text-sm text-darkgreen font-medium">
             <Link to="/dashboard"> <button className="bg-blue-500 text-white p-2 rounded-md w-[150px]">Explore</button></Link>
              </p>
              <br />
            </div>
          </div>
        </div>

        <div className="h-1/2 py-4 bg-green-100 bg-grey" >
      <div className="">
        <div className="flex justify-center flex-col">
          <h1 className="mx-auto tracking-wide text-4xl font-bold uppercase opacity-[0.7]">
            Dial Our Help center at +1 9895850237 
          </h1>
          {/* <p className="mx-48 leading-7 tracking-wide my-6 text-md font-medium">
            We open the door to thousands of farmers. Rent your equipment for
            the off-season, and create an advertisement on our platform. Through
            our rigorous customer compliance, we make sure that only reliable
            users gain access to our digital marketplace.{" "}
            <span className="text-darkgreen">
              There are two ways to get started
            </span>
            :
          </p> */}
       
        </div>
      </div>
    </div>
      </div>

    </div>
  );
};

export default Ads;