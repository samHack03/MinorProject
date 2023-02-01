import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

    faRupeeSign

  } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [price, setPrice] = useState(0);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="sidebar mt-32 bg-[#68AC5D] prFilter" style={{padding:"20px", borderRadius:"20px"}}>
      <div className="sidebar-header">
        <input  type="text" placeholder="Search products" style={{padding:"5px",marginTop:"20px"}}/>
        <select>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Kitchen</option>
        </select>
      </div>
      <p  className="price-value text-white" style={{textAlign:"left"}} >Price Range:</p>

      <hr className="h-px  bg-[#f8fafc] border-2"/>

      <p  className="price-value text-white" style={{textAlign:"left"}} >Price Range per day :</p>
      <div className="price-range">

        <input type="range" min="0" max="1000" value={price} onChange={handlePriceChange}/>
    <span style={{ marginBottom: "20px"}}>   <FontAwesomeIcon  className="price-value text-white" icon={  faRupeeSign} />   <span className="price-value text-white">{price}</span> </span>  
      </div>

      <p  className="price-value text-white" style={{textAlign:"left"}} >Price Range per week :</p>
      <div className="price-range">

        <input type="range" min="0" max="1000" value={price} onChange={handlePriceChange}/>
    <span style={{ marginBottom: "20px"}} >   <FontAwesomeIcon  className="price-value text-white" icon={  faRupeeSign} />   <span className="price-value text-white">{price}</span> </span>  
      </div>
      <p  className="price-value text-white" style={{textAlign:"left"}} >Price Range per month :</p>
      <div className="price-range">

        <input type="range" min="0" max="1000" value={price} onChange={handlePriceChange}/>
    <span style={{ marginBottom: "20px"}} >   <FontAwesomeIcon  className="price-value text-white" icon={  faRupeeSign} />   <span className="price-value text-white">{price}</span> </span>  

    <img src={"https://kapilkhandelwal.com/wp-content/uploads/2020/12/298-2983638_indian-farmer-png-indian-farmer-cartoon-png-transparent.png"} style={{borderRadius:"25%"}}/>
      </div>
      <style jsx>{`
        .sidebar {
          width: 300px;
          padding: 20px;
        }

        .sidebar-header input[type="text"] {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: none;
          border-radius: 5px;
        }

        .sidebar-header select {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: none;
          border-radius: 5px;
        }

        .price-range {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        // .price-range p {
        //   margin-bottom: 10px;
        // }

        input[type="range"] {
          width: 80%;
        //   margin-bottom: 20px;
        }

        .price-value {
          font-weight: bold;
          

        }
      `}</style>
    </div>
  );
}

export default Sidebar;