import React,{useState, useEffect} from 'react'
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

import home1 from '../img/img/home1.jpg'

export default function NavigationBar({companyName="Krish e-Hal"}) {

    //Authstate
    const [authState, setAuthState ] = useState(null);
    //Transparent scroll navbar state
    const [pos, setPos] = useState("top")

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



  return (
  <Navbar expand="lg" className="navbar" 
  style={{backgroundColor: "#219653"}}
  >
  <Link to="/"><Navbar.Brand  className={"text-light brand-name"}>{companyName}</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/"
      className={"text-light"}
      >Home</Nav.Link>
      {authState ? (
       <React.Fragment>
      <Nav.Link as={Link} to="/personal-rooms" className={"text-light"}>Large Equipment</Nav.Link>
      <Nav.Link as={Link} to="/family-apartments" className={"text-light"}>Medium Tools</Nav.Link>
      <Nav.Link as={Link} to="/vacation-villas" className={"text-light"}>Small Tools</Nav.Link>
      <Nav.Link as={Link} to="/become-host" className={"text-light"}>Add Product</Nav.Link>
      </React.Fragment>
      ):""}
    </Nav>
    <Navbar.Collapse className="justify-content-end">
    <NavDropdown title={<FontAwesomeIcon icon={faUserCircle} size="lg"
    className={"text-light dropdown-menu-bar"}
    spin/>}>
      {authState ? (
        <>
        <Container>
        <Nav.Link as={Link} to="/my-profile" className="text-dark">My Profile</Nav.Link>
        <Nav.Link as={Link} to="/my-bookings" className="text-dark">Bookings</Nav.Link>
        <Nav.Link as={Link} to="/my-home-bookings" className="text-dark">Host Bookings</Nav.Link>
        </Container>
        </>
        ) : (
          <>
        <NavDropdown.Item><Nav.Link as={Link} to="/">Login</Nav.Link></NavDropdown.Item>
        <NavDropdown.Item><Nav.Link as={Link} to="/">Signup</Nav.Link></NavDropdown.Item>
        <NavDropdown.Divider />
        </>
        )}
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
