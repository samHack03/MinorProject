import React,{useState, useEffect, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase'
import { Container } from 'react-bootstrap';
// import Button from 'react-google-button'
import {UserContext} from '../context/UserContext'

import logo from "../img/img/logo.png"

import home1 from '../img/img/home1.jpg'

export default function NavigationBar({companyName="Krish e-Hal"}) {

    //Authstate
    const [authState, setAuthState ] = useState(null);
    //Transparent scroll navbar state
    const [pos, setPos] = useState("top");

    const context = useContext(UserContext);

var provider = new firebase.auth.GoogleAuthProvider();

    useEffect (()=>{     
      var path = window.location.pathname

      if(path == "/home"){
      document.addEventListener("scroll", e => {
          let scrolled = document.scrollingElement.scrollTop;
  
          if (scrolled >= 5){
             setPos("moved")
          } else {
             setPos("top")
          }
      })
    }else{
      setPos("moved")
    }
  },[])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        context.setUser({email: user.email, uid: user.uid})
      }
    });
  }, [])
    

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (!user) {
            setAuthState(false)
          }else{
            setAuthState(true)
          }
        });
      }, [])

//signout function
const Logout = () => {
  firebase.auth().signOut().then(()=>{
    <Redirect to="/" />
  })
  .catch((error)=>{
   toast(error, {type:"error"})
  })
}

// const googleAuth = () => {
//   firebase.auth()
//  .signInWithPopup(provider)
//  .then((result) => {
//    /** @type {firebase.auth.OAuthCredential} */
//    // var credential = result.credential;
//    // var token = credential.accessToken;
//    // The signed-in user info.
//    // var Signeduser = result.user;
//    toast(`Welcome ${result.user.displayName}`,{type: "success"})
//  }).catch((error) => {
//    // Handle Errors here.
//    // var errorCode = error.code;
//    var errorMessage = error.message;
//    // var email = error.email;
//    // var credential = error.credential;
//    toast(errorMessage, { type: "error"});
//    // ...
//  });
// }

const addToast=()=>{
  console.log(context.user,"at 100 line in navbar")
  if(context.user==null){
    alert("Login first to add product")
    toast.error("Login first to add product");
  }
}




  return (
  <Navbar expand="lg" className="navbar" 
  style={{backgroundColor: "#219653"}}
  > 
  <img  width="60px" height="55px"  src={logo}/>
  <Link to="/"><Navbar.Brand  className={"text-light pl-4 pr-4 text-3xl tracking-wide cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5 "}>{companyName}</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto ml-7">
      <Nav.Link as={Link} to="/"
      className={"text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"}
      >Home</Nav.Link>
      
      <React.Fragment>
      <Nav.Link as={Link} to="/dashboard" className={" pl-4 tracking-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"}>Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/heavy-machinery" className={" pl-4 tracking-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"}>Heavy Machinery</Nav.Link>
      <Nav.Link as={Link} to="/medium-tools" className={" pl-4 tracking-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"}>Medium Tools</Nav.Link>
      <Nav.Link as={Link} to="/small-tools" className={" pl-4 tracking-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"}>Small Tools</Nav.Link>
      <Nav.Link as={Link} to="/become-host" onClick={addToast} className={" pl-4 tracking-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"}>Add Product</Nav.Link>
      <Nav.Link as={Link} to="/contact" className={" pl-4 tracking-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"}>Contact</Nav.Link>


      </React.Fragment>
      <div id="google_translate_element" style={{marginLeft:"5px"}}></div>
      {/* {!authState &&   <button type="button" class=" pl-4 tracing-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5" onClick={googleAuth}>Login</button>  } */}
    </Nav>

    <Navbar.Collapse className="justify-content-end">
    <NavDropdown title={<FontAwesomeIcon icon={faUserCircle} size="xl"
    className={"text-light dropdown-menu-bar"}
    spin/>}>



      {authState ? (
        <>
        <Container>
        <Nav.Link as={Link} to="/my-profile" className="text-dark">My Profile</Nav.Link>
        <Nav.Link as={Link} to="/my-bookings" className="text-dark">All Bookings</Nav.Link>
        <Nav.Link as={Link} to="/my-home-bookings" className="text-dark">My bookings</Nav.Link>
        </Container>
        </>
        ) : (
          <>
        <NavDropdown.Item><Nav.Link as={Link} to="/login" >Login</Nav.Link></NavDropdown.Item>
        {/* {!authState &&   <button type="button" class=" pl-4 tracking-wide text-light text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5" >Login</button>  } */}
        <NavDropdown.Item><Nav.Link as={Link} to="/signup">Signup</Nav.Link></NavDropdown.Item>
        <NavDropdown.Divider />
        </>
        )
        }
        {authState ? (
        <>
        <NavDropdown.Item><Button className="btn btn-danger" onClick={Logout}>Logout</Button></NavDropdown.Item>
        </>
        ) :""}
      </NavDropdown>

    {authState ? (
    <>
    <Navbar.Text>

    </Navbar.Text>
    </>
      ):""}

  </Navbar.Collapse>
  </Navbar.Collapse>
  {/* Error toast */}
  <ToastContainer/>
</Navbar>

    )
}
