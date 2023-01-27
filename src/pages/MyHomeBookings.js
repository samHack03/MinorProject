import React from 'react'
import HomeBookings from '../Components/HomeBookings'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer/Footer';

export default function MyHomeBookings() {
    return (
        <div>
          <Navbar/>
            <HomeBookings/>
          <Footer/>
        </div>
    )
}
