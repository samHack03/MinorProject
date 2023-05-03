import React,{useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
// import {Redirect, Link} from 'react-router-dom'
// import firebase from 'firebase'
// import {UserContext} from '../context/UserContext'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import GoogleButton from 'react-google-button'
import AdminNavigationBar from '../navbar';
// import Footer from '../Components/footer/Footer'

export default function AdminLogin() {

// const context = useContext(UserContext);

// var provider = new firebase.auth.GoogleAuthProvider();

// const googleAuth = () => {
//    firebase.auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /** @type {firebase.auth.OAuthCredential} */
//     // var credential = result.credential;
//     // var token = credential.accessToken;
//     // The signed-in user info.
//     // var Signeduser = result.user;
//     window.location.href = "http://localhost:3000/";
//     toast(`Welcome ${result.user.displayName}`,{type: "success"})


//   }).catch((error) => {
//     // Handle Errors here.
//     // var errorCode = error.code;
//     var errorMessage = error.message;
//     // var email = error.email;
//     // var credential = error.credential;
//     toast(errorMessage, { type: "error"});
//     // ...
//   });
// }

// useEffect(() => {
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       context.setUser({email: user.email, uid: user.uid})
//     }
//   });
// }, [])



    return (
      <div>

      <AdminNavigationBar/>
      <center>
      <form 
      style={{width:"40%",height:"300px"}} 
    //   class="bg-white shadow-md rounded mt-36 px-8 pt-6 pb-8 mb-4"
    className='mt-32'
      >

<h4
          className="font-bold text-2xl  my-16 font-semibold uppercase text-green-800"
          style={{ marginTop: "50px", marginLeft: "20px" }}
        >
        Admin Login
        </h4>

    <div class="mb-4">
    <h4
          className=" flex justify-start text-lg text-green-800"
          style={{ marginTop: "50px", marginLeft: "20px" }}
        >
        Email
        </h4>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter email here ....."/>
    </div>
    <div class="mb-6">
    <h4
          className=" flex justify-start text-lg text-green-800"
          style={{ marginTop: "50px", marginLeft: "20px" }}
        >
        Password
        </h4>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter password here ....."/>
    </div>
    <div class="flex justify-center">
        <Link to="/admin">
      <button class="text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900" type="button" 
      >
        Login In
      </button>
        </Link>
     
    </div>
  </form>
      </center>
    {/* <center>
    <h3 className='text-2xl font-semibold uppercase text-center text-green-800'>OR</h3>

<button type="button" class="mb-4 rounded-full text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2" onClick={googleAuth} style={{borderRadius:"50%"}}>
  <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
  Sign in with Google
</button>
 

    </center> */}
  
      {/* <Footer/> */}
      </div>
  )
 
   
}
