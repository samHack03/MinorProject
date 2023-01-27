import React from 'react'
import MyBookingsSection from '../Components/MyBookingsSection'
import  Navbar from '../Components/navbar'
import Footer from '../Components/footer/Footer';


export default function MyBookings() {
    return (
        <div>
           <Navbar/>
           <MyBookingsSection/>
           <Footer/>
        </div>
    )
}
