import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore , collection, getDocs, query } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyAKFHeOlxxbia66vTYJAdYKiJKO216BgvY",
    authDomain: "game-online-ifmachado.firebaseapp.com",
    projectId: "game-online-ifmachado",
    storageBucket: "game-online-ifmachado.appspot.com",
    messagingSenderId: "957180730749",
    appId: "1:957180730749:web:7d40dc1fce8f0d01514014",
    measurementId: "G-5WVDHQD2YS",
    databaseURL: "https://game-online-ifmachado-default-rtdb.firebaseio.com/",
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);
auth.languageCode = 'pt';
provider.addScope('');



let tela = 0;

const menu = document.getElementById("menu");

const image = document.getElementById("myImage");

const life = document.getElementById("life");

life.style.left = window.innerWidth-300;

menu.style.opacity = 0
image.style.opacity = 0
menu.style.top = `${window.innerHeight-70}px`;

let valorAleatorio1 = Math.floor(Math.random() * window.innerWidth);
let valorAleatorio2 = Math.floor(Math.random() * window.innerHeight);

if(valorAleatorio1 < 300 || valorAleatorio1 > window.innerWidth-100){
    valorAleatorio1 = Math.floor(Math.random() * window.innerWidth-100);
}else{
    if(valorAleatorio2 < 100 || valorAleatorio1 > window.innerHeight*0.8){
        valorAleatorio2 = Math.floor(Math.random() * window.innerHeight);
    }
}

menu.style.opacity = 100
image.style.opacity = 100

//console.log(valorAleatorio2)

//const lanterna = document.getElementById("lanterna");

//lanterna.style.opacity = 100

//lanterna.style.top = `${valorAleatorio2+20}px`;
//lanterna.style.left = `${valorAleatorio1+20}px`;

const coord = [valorAleatorio1,valorAleatorio2]

let yPos = 0;
let xPos = 0;

const nomeEstudante = document.getElementById("nomeEstudante")
const fotoEstudante = document.getElementById("fotoEstudante")

function puxarCoord(){
  const starCountRef = ref(db, "users/"+localStorage.getItem("uid"));
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    yPos = data.y;
    image.style.top = `${yPos}px`;
    xPos = data.x;
    image.style.left = `${xPos}px`;
  });
}

const mapa = document.getElementById("mapa")

function colocarPlayers(){
  const dbRef = ref(db, 'users');

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      try{
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          console.log(childKey)
          const img = document.getElementById(childKey)
          img.style.position = "absolute" 
          img.style.top = `${childData.y}px`;
          img.style.left = `${childData.x}px`;
          console.log(childData)
        }
      }catch{
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          console.log(childKey)
          const img = document.createElement("img")
          img.id = childKey;
          img.src = "https://i.pinimg.com/originals/1c/04/48/1c0448350625530d3873a100248540d9.gif"
          img.style.position = "absolute" 
          img.style.top = `${childData.y}px`;
          img.style.left = `${childData.x}px`;
          console.log(childData)
          mapa.append(img)
        }
      }
    });
  });
  /*onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const img = document.getElementById(`${data.bot}`)
    img.src = "https://i.pinimg.com/originals/1c/04/48/1c0448350625530d3873a100248540d9.gif"
    img.style.position = "absolute" 
    img.style.top = `${data.bot.y}px`;
    img.style.left = `${data.bot.x}px`;
    console.log(data.y)
    mapa.append(img)
  });*/
}

function login(){
  //console.log(localStorage.getItem("uid"))
  if(localStorage.getItem("uid")){
    puxarCoord();
    nomeEstudante.innerText = localStorage.getItem("diplayname");
    fotoEstudante.src = localStorage.getItem("photoURL");
  }else{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    //console.log(user.displayName);
    //console.log(user);
    /**
     * {
    "uid": "zyO3JHsM4fYhmA1OSEd6C8tt3m92",
    "email": "johannsacconi@gmail.com",
    "emailVerified": true,
    "displayName": "Johann Estêvão Sacconi Ferreira",
    "isAnonymous": false,
    "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKbwVbq-6oScyADnChwjUPOnbHtXaW87TsXrJK5MJmBwYycCo6Fog=s96-c",
    "providerData": [
        {
            "providerId": "google.com",
            "uid": "101151461539726724371",
            "displayName": "Johann Estêvão Sacconi Ferreira",
            "email": "johannsacconi@gmail.com",
            "phoneNumber": null,
            "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKbwVbq-6oScyADnChwjUPOnbHtXaW87TsXrJK5MJmBwYycCo6Fog=s96-c"
        }
    ],
    "stsTokenManager": {
        "refreshToken": "AMf-vBwpgBr_5sYyIvh5_Ht-gsTi5OdbKQpmLRZZh5tS-mNS55I-4cVqrbPw5MMlVz_y28d4xGw6HPmnEI_aSNpqzw7A84vTkToa8q8p_pLhklf-UYmyByYzzdwaU2X5Fv6uFqBDQ6xl41j-8LVo1QSlRwLs4ceLKCONgkSBFwq-smMS1yGjE2AfYZFq3cBHkczn0DtBty5w0aaNZVnnPBKA6krXDzhimXLxHE9BCCacBoc45daERkurKq1br7PRmfKeiXilNirNEALW6ZE1khTKUV6mWgoHeHVtkXc9406FkZEVZ0xN7sjIbDeNK4UBt4kIRZ3o2K12afQZuZDM87jX7krhqocLkvfJdfrese1QFmjw7jWwNJ2CnyVCsgwFb4OVIUHYRRNFgd78foVciMEpW5ryxj4HxNL63ugX8Z1nwYabAACoo02fihrmALpM3dJ2kbyUBPm3HRn9Cyr3S_2JcjblOMb39TqHO_la_rBgwCyZbH4skdY",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlMzcxNzMwZWY4NmViYTI5YTUyMTJkOWI5NmYzNjc1NTA0ZjYyYmMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSm9oYW5uIEVzdMOqdsOjbyBTYWNjb25pIEZlcnJlaXJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tid1ZicS02b1NjeUFEbkNod2pVUE9uYkh0WGFXODdUc1hySks1TUptQndZeWNDbzZGb2c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2FtZS1vbmxpbmUtaWZtYWNoYWRvIiwiYXVkIjoiZ2FtZS1vbmxpbmUtaWZtYWNoYWRvIiwiYXV0aF90aW1lIjoxNzIzNzM2MzAyLCJ1c2VyX2lkIjoienlPM0pIc000ZllobUExT1NFZDZDOHR0M205MiIsInN1YiI6Inp5TzNKSHNNNGZZaG1BMU9TRWQ2Qzh0dDNtOTIiLCJpYXQiOjE3MjM3MzYzMDIsImV4cCI6MTcyMzczOTkwMiwiZW1haWwiOiJqb2hhbm5zYWNjb25pQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAxMTUxNDYxNTM5NzI2NzI0MzcxIl0sImVtYWlsIjpbImpvaGFubnNhY2NvbmlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.dANwL7vbOhEoBTMmfnONQgeAsc3QqkR_46JIRhKoXPUfmTfSLMvZFRpcyU2rovhdAgj-OqC6SnGrooUzYfqYxulCgf-haZffyuci0wieDy-hWRCcp2QBdAMcvyoxqojGHF0gzM185eLV_-qmbqorIYX_3UPFzhyyhP-erpw6VA9CHJmQS0NoRy0S3jiQOE1QUtf0YokhBYhZACIieSRscAP7D21OoskqsV-f-kEmrTL_kO7Vv_qJ8OnqdwCjG1vUSJASUNglo7bJH0b5c_ewFHklGtNJKuqdilqTkMkg8RAz29JNFMVWLnbINsJVVq2knEKaGR1X7DazGbQxn8GseA",
        "expirationTime": 1723739901889
    },
    "createdAt": "1723733797699",
    "lastLoginAt": "1723736247909",
    "apiKey": "AIzaSyAKFHeOlxxbia66vTYJAdYKiJKO216BgvY",
    "appName": "[DEFAULT]"
    }
     */
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    localStorage.setItem("uid", user.uid)
    localStorage.setItem("diplayname", user.displayName)
    localStorage.setItem("emailVerified", user.emailVerified)
    localStorage.setItem("email", user.email)
    localStorage.setItem("photoURL", user.photoURL)
    localStorage.setItem("photoPerso", "")
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
colocarPlayers()
}

login()

function atualizarCoord(userId, x, y) {
    set(ref(db, "users/"+userId), {
      x: x,
      y: y
    });
  
}

window.addEventListener("keydown", function(event) {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    //console.log(`Resolução da tela: ${larguraTela} x ${alturaTela}`);
    //console.log(event.key); // prints the key value (e.g. "a", "Shift", "Enter", etc.)
    //console.log(event.code); // prints the key code (e.g. "KeyA", "ShiftLeft", "Enter", etc.)
    //console.log(event.altKey); // prints true if the Alt key is pressed
    //console.log(event.ctrlKey); // prints true if the Ctrl key is pressed
    //console.log(event.shiftKey); // prints true if the Shift key is pressed
    switch (event.key) {
        case "w":
          yPos -= 10;
          image.style.top = `${yPos}px`;
          break;
        case "s":
          yPos += 10;
          image.style.top = `${yPos}px`;
          break;
        case "a":
            xPos -= 10;
            image.style.left = `${xPos}px`;
            break;
        case "d":
            xPos += 10;
            image.style.left = `${xPos}px`;
            break;
      }
    if(tela == 0 && xPos >= larguraTela){
        xPos = 0
        image.style.left = `${xPos}px`;
    }
    //console.log(lanterna.style.opacity)
    if(xPos >= coord[0]-30 && xPos <= coord[0]*1.1 && yPos >= coord[1]-150 && yPos <= coord[1]+100 && lanterna.style.opacity != 0){
        this.alert("Você pegou uma lanterna!")
        lanterna.style.opacity = 0
    }

    atualizarCoord(this.localStorage.getItem("uid"), xPos, yPos);
  }); 


