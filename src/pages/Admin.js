import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import '../App.css';
import {UserContext} from '../context/UserContext'
import { BookingContext } from '../context/BookingContext';
import Home from '../Components/Admin/Home';
import AdminNavigationBar from "../Components/Admin/navbar";
import Footer from "../Components/footer/Footer";


function App() {

  const [user, setUser] = useState(null)
  const [arrivalDate, setArrivalDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [guests, setGuests] = useState("");
  
  return (
  <UserContext.Provider value={{user, setUser}}>
    <BookingContext.Provider value={{arrivalDate, setArrivalDate, departDate, setDepartDate, guests, setGuests }}>
     <AdminNavigationBar/>
     <Home/>
     <Footer/>
     </BookingContext.Provider>
   </UserContext.Provider>
  );

}



export default App;
