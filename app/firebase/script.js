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



let tela = 7;

const menu = document.getElementById("menu");

const life = document.getElementById("life");

const alerta = document.getElementById("alert")
alerta.style.opacity = 0
const alert_text = document.getElementById("alert-text")

life.style.left = window.innerWidth-300;

menu.style.opacity = 0
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

//console.log(valorAleatorio2)

//const lanterna = document.getElementById("lanterna");

//lanterna.style.opacity = 100

//lanterna.style.top = `${valorAleatorio2+20}px`;
//lanterna.style.left = `${valorAleatorio1+20}px`;

const coord = [valorAleatorio1,valorAleatorio2]

let yPos = 160;
let xPos = 0;

const nomeEstudante = document.getElementById("nomeEstudante")
const fotoEstudante = document.getElementById("fotoEstudante")

const mapa = document.getElementById("mapa")

function colocarPlayers(){
  const dbRef2 = ref(db, 'itens');

  onValue(dbRef2, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if(tela == childData.tela){
      try{
          const childKey = childSnapshot.key;
          //console.log(childKey)
          const img = document.getElementById(childKey)
          img.style.position = "absolute" 
          img.style.opacity = 100
          img.style.top = `${childData.y}px`;
          img.style.left = `${childData.x}px`;
          //console.log(childData)
      }catch (e){
          const childKey = childSnapshot.key;
          const img = document.createElement("img")
          img.id = childKey;
          img.src = `${childData.img}`
          img.style.width = "200px"
          img.style.position = "absolute" 
          img.style.top = `${childData.y}px`;
          img.style.left = `${childData.x}px`;
          mapa.append(img)
      }
    }else{
      try{
          const childKey = childSnapshot.key;
          const img = document.getElementById(childKey)
          img.style.opacity = 0
      }catch{}
    }
    });
  });

  const dbRef = ref(db, 'users');

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    if(tela == childData.tela){
      try{
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          //console.log(childKey)
          const img = document.getElementById(childKey)
          img.style.position = "absolute" 
          img.style.opacity = 100
          img.style.top = `${childData.y+200}px`;
          img.style.left = `${childData.x}px`;
          try{
            if(childData.img != null || childData.img!="undefined"){
              img.src = childData.img
            }else{
              img.src = "https://i.pinimg.com/originals/1c/04/48/1c0448350625530d3873a100248540d9.gif"
            } 
          }catch{
            img.src = "https://i.pinimg.com/originals/1c/04/48/1c0448350625530d3873a100248540d9.gif"
          }
          //console.log(childData)
        }
      }catch (e){
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          //console.log(childKey)
          const img = document.createElement("img")
          img.id = childKey;
          try{
            if(childData.img != null || childData.img!="undefined"){
              img.src = childData.img
            }else{
              img.src = "https://i.pinimg.com/originals/1c/04/48/1c0448350625530d3873a100248540d9.gif"
            } 
          }catch{
            img.src = "https://i.pinimg.com/originals/1c/04/48/1c0448350625530d3873a100248540d9.gif"
          }
          img.style.position = "absolute" 
          img.style.top = `${childData.y+200}px`;
          img.style.left = `${childData.x}px`;
          
          //console.log(childData)
          mapa.append(img)
        }
      }
    }else{
      try{
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          const img = document.getElementById(childKey)
          img.style.opacity = 0
        }
      }catch{}
    }
    try{
      if(localStorage.getItem("uid") == childSnapshot.key){ 
        const childKey = childSnapshot.key;
        //console.log(childKey)
        const img = document.getElementById("myImage")
        img.style.position = "absolute" 
        img.style.top = `${childData.y+95}px`;
        img.style.left = `${childData.x}px`;
        console.log(childData)
      }
    }catch (e){
      if(localStorage.getItem("uid") == childSnapshot.key){
        const childKey = childSnapshot.key;
        //console.log(childKey)
        const img = document.createElement("img")
        img.id = "myImage"
        img.src = childData.img
        img.style.position = "absolute" 
        yPos = childData.y;
        img.style.top = `${yPos}px`;
        xPos = childData.x;
        img.style.left = `${xPos}px`;
        localStorage.setItem("imgPerso", childData.img)
        //console.log(childData)
        mapa.append(img)
      }
    }
    });
  });
}

function trocarTela(){
  alert_text.textContent = ""
  alerta.style.opacity = 0
  if(tela == 1){

  }if(tela == 2){
    
  }if(tela == 3){
    
  }if(tela == 4){
    
  }if(tela == 5){
    
  }if(tela == 6){
    
  }if(tela == 7){
    mapa.style.backgroundImage = 'url(img/Laboratorio.png)'
  }
  
  if(tela == 17){
    mapa.style.backgroundImage = 'url(img/Laboratorio-2.png)'
  }
  localStorage.setItem("tela", tela)
  colocarPlayers()
}

function login(){
  //console.log(localStorage.getItem("uid"))
  if(localStorage.getItem("uid")){
    menu.style.opacity = 100
    nomeEstudante.innerText = localStorage.getItem("diplayname");
    fotoEstudante.src = localStorage.getItem("photoURL");
  }else{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    localStorage.setItem("uid", user.uid)
    localStorage.setItem("diplayname", user.displayName)
    localStorage.setItem("emailVerified", user.emailVerified)
    localStorage.setItem("email", user.email)
    localStorage.setItem("photoURL", user.photoURL)
    localStorage.setItem("tela", 7)
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

function atualizarCoord(userId, x, y, tela, imgPerso) {
    set(ref(db, "users/"+userId), {
      x: x,
      y: y,
      tela: tela,
      img:imgPerso
    });
    localStorage.setItem("x",x)
    localStorage.setItem("y",y)
}

window.addEventListener("keydown", function(event) {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    try{
    const image = this.document.getElementById("myImage")
    switch (event.key) {
        case "w":
          if(yPos >= 40){
            yPos -= 10;
            image.style.top = `${yPos}px`;
          }
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
        case "e":
          if(xPos >= 600 && xPos <= 780 && yPos <= 190 && yPos >= 4 && (tela == 7)){
                tela = 17
                xPos = 50;
                image.style.left = `${xPos}px`;
                trocarTela()
              }
              else if(xPos >= 10 && xPos <= 60 && yPos <= 100 && yPos >= 0 && (tela == 17)){
                tela = 7
                xPos = 690;
                image.style.left = `${xPos}px`;
                trocarTela()
              }
              break;
      }
    if(tela == 0 && xPos >= larguraTela){
        xPos = 0
        image.style.left = `${xPos}px`;
    }
    //console.log(lanterna.style.opacity)
    /*if(xPos >= coord[0]-30 && xPos <= coord[0]*1.1 && yPos >= coord[1]-150 && yPos <= coord[1]+100 && lanterna.style.opacity != 0){
        this.alert("Você pegou uma lanterna!")
        lanterna.style.opacity = 0
    }*/
   if(xPos >= 600 && xPos <= 780 && yPos <= 190 && yPos >= 4 && (tela == 7)){
    alert_text.textContent = "Aperte E para interagir."
    alerta.style.opacity = 100
   }
   else if(xPos >= 10 && xPos <= 60 && yPos <= 100 && yPos >= 0 && (tela == 17)){
    alert_text.textContent = "Aperte E para interagir."
    alerta.style.opacity = 100
   }else{
    alert_text.textContent = ""
    alerta.style.opacity = 0
   }

    atualizarCoord(this.localStorage.getItem("uid"), xPos, yPos, tela, this.localStorage.getItem("imgPerso"));
    }
    catch{

    }
  }); 


  if(localStorage.getItem("tela")){
    tela = parseInt(localStorage.getItem("tela"));
    trocarTela()
  }
