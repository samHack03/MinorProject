import React,{useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from '../Components/navbar'
import FeaturedSection from '../Components/featuredSection'
import HeroSection from '../Components/hero-section'
import Banner from "../Components/banner/Banner";
import firebase from 'firebase'
import CategoriesSection from '../Components/CategoriesSection'
// import FindRoommatesContent from '../Components/FindRoommatesContent'
import Footer from '../Components/footer/Footer.jsx'
import PreHeader from '../Components/preheader/PreHeader'
import Equipments from '../Components/equipments/Equipments'
import Workflow from '../Components/workflow/Workflow'
import Support from '../Components/support/Support'
import Ads from '../Components/ads/Ads'
import Stats from '../Components/stats/Stats'
import Services from '../Components/services/Services'
import Chat from "../Components/chatbot/chatbot";

import Chatbot from 'react-chatbot-kit'

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

import {UserContext} from '../context/UserContext'

export default function Home() {


      return(
      <>
      <PreHeader/>

      {/* <HeroSection/> */}
      <Banner/>
      <Support/>
      <FeaturedSection/>
      <CategoriesSection/>
      <Workflow/>
      <Services/>
      <Ads/>
      <Stats/>
      {/* <FindRoommatesContent/> */}
      <Equipments/>
       <Chat/>
      </>
      )
    }


