import firebase from "firebase";


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBq7wBJVSCiSI4BtibX-uKOnVlmJXay0Ds",
    authDomain: "learn-authentication-4e0b5.firebaseapp.com",
    projectId: "learn-authentication-4e0b5",
    storageBucket: "learn-authentication-4e0b5.appspot.com",
    messagingSenderId: "244492489859",
    appId: "1:244492489859:web:832812c3c36f150352b7b6"
  };
  // Initialize Firebase
const fire=firebase.initializeApp(firebaseConfig);

export default fire;