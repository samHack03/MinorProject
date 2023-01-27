import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import becomeHost from './pages/becomeHost';
import Signup from './pages/Signup'
import Home from './pages/Home'
import SuccessfulPosting from './pages/SuccessfulPosting'
import MyProfile from './pages/MyProfile'
import CreateProfile from './pages/CreateProfile'
import SingleProperty from './pages/SinglePropertyPage'
import SuccessfulBooking from './pages/SuccessfulBooking'
import MyBookings from './pages/MyBookings';
import MyHomeBookings from './pages/MyHomeBookings';
import PersonalRooms from './pages/PersonalRooms';
import FamilyApartments from './pages/FamilyApartments';
import VacationVillas from './pages/VacationVillas';
import ScrollToTop from './Components/ScrollToTop';
import PublicProfilePage from './pages/PublicProfilePage';
import Help from "./Components/help/Help";
import PartnerDispute from "./Components/dispute/PartnerDispute";
import FAQ from "./Components/faq/FAQ";
import Feedback from "./Components/feedback/Feedback"
import ContactUs from './Components/contactUs/ContactUs';

const routing = (
  
  <Router>
  <ScrollToTop/>
    <Route exact path="/" component={App}/>
    <Route exact path="/become-host" component={becomeHost}/>
    <Route exact path="/signup" component={Signup}/>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/done-posting-home" component={SuccessfulPosting}/>
    <Route exact path="/my-profile" component={MyProfile}/>
    <Route exact path="/create-profile" component={CreateProfile}/>
    <Route exact path="/property" component={SingleProperty}/>
    <Route exact path="/done-booking" component={SuccessfulBooking}/>
    <Route exact path="/my-bookings" component={MyBookings}/>
    <Route exact path="/my-home-bookings" component={MyHomeBookings}/>
    <Route exact path="/heavy-machinery" component={PersonalRooms}/>
    <Route exact path="/family-apartments" component={FamilyApartments}/>
    <Route exact path="/vacation-villas" component={VacationVillas}/>
    <Route exact path="/find-roommates" component={PublicProfilePage}/>
    <Route exact path="/help" component={Help}/>
    <Route exact path="/faq" component={FAQ} />
    <Route exact path="/partner-dispute" component={PartnerDispute}/>
    <Route path="/feedback" component={Feedback} />
    <Route exact path="/contact" component={ContactUs} />
    
        
  </Router>
)

ReactDOM.render(routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
