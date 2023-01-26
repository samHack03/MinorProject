import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import {UserContext} from './context/UserContext'
import Home from './pages/Home'


function App() {

  const [user, setUser] = useState(null)
  
  return (
  <UserContext.Provider value={{user, setUser}}>
     <Home/>
   </UserContext.Provider>
  );

}



export default App;
