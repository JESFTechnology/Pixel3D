import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore , collection, getDocs, query } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAKFHeOlxxbia66vTYJAdYKiJKO216BgvY",
    authDomain: "game-online-ifmachado.firebaseapp.com",
    projectId: "game-online-ifmachado",
    storageBucket: "game-online-ifmachado.appspot.com",
    messagingSenderId: "957180730749",
    appId: "1:957180730749:web:7d40dc1fce8f0d01514014",
    measurementId: "G-5WVDHQD2YS"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'pt';

provider.addScope(' ');

function login(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage)
    // ...
  });
}

login()