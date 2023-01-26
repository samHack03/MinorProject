import firebase from 'firebase'
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA3pHAaUsyQzmdbL68AQe4s-F8Xt9fI9Uk",
  authDomain: "houserental-6258c.firebaseapp.com",
  projectId: "houserental-6258c",
  storageBucket: "houserental-6258c.appspot.com",
  messagingSenderId: "873920444715",
  appId: "1:873920444715:web:662f0b5a28b6b03ec2ed6e"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

  const auth = firebase.auth();

  export const storage  = firebase.storage();

  export {auth, database};
