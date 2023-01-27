import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import {UserContext} from './context/UserContext'
import Home from './pages/Home'
import Navbar from "../src/Components/navbar";
import Footer from "../src/Components/footer/Footer"


function App() {

  const [user, setUser] = useState(null)
  
  return (
  <UserContext.Provider value={{user, setUser}}>
    <Navbar/>
     <Home/>
     <Footer/>
   </UserContext.Provider>
  );

}



export default App;
