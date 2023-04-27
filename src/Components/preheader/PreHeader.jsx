import React from "react";
import "./PreHeader.css";

const PreHeader = () => {
  const width = window.innerWidth;
  return (
    <div className="bg-[#219653] px-6 py-2 md:inline-block hidden w-full">
      <div className="flex justify-between items-center ml-6">
        <div className="flex justify-center items-center">
          <img
            src="https://www.bpitindia.com/wp-content/uploads/2020/11/logo-2.png"
            className="logo"
            alt="" style={{width: "90px"}}
          />
          <p className="font-semibold text-white text-xs sm:text-sm ml-1" style={{marginLeft:"50px"}}>
                Final Year Minor Project
          </p>
        </div>
        <div className="">
          <div className="" id="google_element"></div>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
